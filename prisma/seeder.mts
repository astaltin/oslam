import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";
import { camelCase } from "change-case";
import { randomInt } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import pluralize from "pluralize";
import { prisma } from "../lib/prisma";

const dataDir = path.join(import.meta.dirname, "data");
const models = (await readdir(dataDir)).filter((path) => path.endsWith("json"));

console.log("Loading the data from 'prisma/data'\n");

let seededModelCount = 0;

for (const model of models) {
  try {
    // get the raw model name out of the file name
    const collName = model.split(".")[0];
    const currentModel = camelCase(pluralize.singular(collName));

    console.log(`Seeding '${collName}'...`);

    const data = JSON.parse(
      await readFile(path.join(dataDir, model), "utf8"),
    ) as [{ [k: string]: string | number | null }];

    if (!data.length) {
      console.warn(`'${collName}' does not contain any data. Skipping...`);
      continue;
    }

    // Check if the model exists on Prisma to avoid errors
    if (typeof prisma[currentModel].createMany !== "function") {
      console.warn(
        `Model '${currentModel}' does not exist in Prisma. Skipping...`,
      );
      continue;
    }

    const transformedData = data.map((item) =>
      Object.fromEntries(
        Object.entries(item).map(([k, v]) => [camelCase(k), v]),
      ),
    );

    await prisma[currentModel]["createMany"]({ data: transformedData });
    seededModelCount += 1;
  } catch (error) {
    console.error(`An error occured while seeding '${model}':`, error);
  }
}

console.log("\nGenerating fake data...\n");

const person = faker.person;

try {
  await prisma.$transaction(async (prisma) => {
    const patient = await prisma.patient.create({
      data: {
        name: person.fullName(),
        gender: person.sex(),
        age: new Date().getFullYear() - faker.date.birthdate().getFullYear(),
        address: faker.location.streetAddress({ useFullAddress: true }),
      },
    });

    const billing = await prisma.billing.create({
      data: { patientId: patient.patientId },
    });

    const service = (
      await prisma.service.aggregateRaw({
        pipeline: [
          { $sample: { size: 1 } },
          { $project: { _id: 0, service_id: 1, fee: 1 } },
        ],
      })
    )[0] as { serviceId: number; fee: string };

    const serviceQty = randomInt(2);
    const serviceTotalCost = new Prisma.Decimal(service.fee).mul(2).toFixed(2);

    const billingService = await prisma.billingService.create({
      data: {
        billingId: billing.billingId,
        serviceId: service.serviceId,
        quantity: serviceQty,
        totalCost: serviceTotalCost,
      },
    });

    const discount = (
      await prisma.discount.aggregateRaw({
        pipeline: [
          { $sample: { size: 1 } },
          { $project: { _id: 0, discount_id: 1, percentage: 1 } },
        ],
      })
    )[0] as { discountId: number; percentage: number };

    const SCALING_FACTOR = 100;
    const discountAsDecimal = new Prisma.Decimal(discount.percentage).div(
      SCALING_FACTOR,
    );
    const discountAmount = new Prisma.Decimal(billingService.totalCost)
      .mul(discountAsDecimal)
      .toString();

    await prisma.billingDiscount.create({
      data: {
        billingId: billing.billingId,
        discountId: discount.discountId,
        amount: discountAmount,
      },
    });
  });
} catch (error) {
  console.error("An error occured while generating fake data:", error);
}

console.log(
  `\nSuccessfully seeded database with ${seededModelCount} out of ${models.length} collection(s).`,
);
