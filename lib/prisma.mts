import { PrismaClient, type PrismaPromise } from "@prisma/client";
import { camelCase, snakeCase } from "change-case";
import pluralize from "pluralize";
import { isPrismaError } from "../util/isPrismaError";

type DataValue = { [k: string]: string | boolean | number | null };

const prisma = new PrismaClient().$extends({
  query: {
    $allModels: {
      async create({ args, query, model, operation }) {
        const collName = snakeCase(pluralize(model));
        const seqId = `${camelCase(model)}Id`;

        const data = args.data as DataValue;

        try {
          const doc = await prisma.$transaction(async (prisma) => {
            const counter = await getNextSequenceValue(collName, prisma);
            data[seqId] = counter;

            return query(args);
          });

          return doc;
        } catch (error) {
          handlePrismaError(error, collName, operation);
        }
      },
    },
  },
});

// --------------------
//  R E F A C T O R S
// --------------------
async function getNextSequenceValue(collName, prisma: PrismaClient, inc = 1) {
  const counter = prisma.$runCommandRaw({
    findAndModify: "counters",
    query: { coll: collName },
    update: { $inc: { seq_value: inc } },
    new: true,
    upsert: true,
    bypassDocumentValidation: true,
  }) as PrismaPromise<{ value: { seq_value: number } }>;

  return (await counter).value.seq_value;
}

function handlePrismaError(error, collName, operation) {
  const isDevelopment = process.env.NODE_ENV === "development";

  if (!isPrismaError(error)) {
    throw error;
  }
  if (isDevelopment) {
    console.error(
      `An error occured while performing '${pluralize.singular(collName)}.${operation}()':`,
      error,
    );
  }
}

export { prisma };
