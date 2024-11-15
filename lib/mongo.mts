import { MongoClient, MongoError } from "mongodb";

const isDevelopment = process.env.NODE_ENV === "development";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not defined.");
}

const mongo = new MongoClient(databaseUrl);
try {
  await mongo.connect();
} catch (error) {
  if (error instanceof MongoError) {
    if (isDevelopment) console.error("MongoClient Error:", error);
  } else {
    throw error;
  }
}

export { mongo };
