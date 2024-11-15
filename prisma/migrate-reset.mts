import { MongoError } from "mongodb";
import { mongo } from "../lib/mongo.mts";

const collections = await mongo.db().collections();

let droppedCollectionCount = 0;

for (const collection of collections) {
  try {
    console.log(`Dropping '${collection.collectionName}'...`);

    const isDropped = await collection.drop();

    if (isDropped) {
      droppedCollectionCount += 1;
    } else {
      console.log(`Failed to drop '${collection.collectionName}' collection.`);
    }
  } catch (error) {
    if (error instanceof MongoError) {
      console.error("An error occured while resetting migrations:", error);
    } else {
      throw error;
    }
  }
}

console.log(
  `\nSuccessfully dropped ${droppedCollectionCount} out of ${collections.length}.`,
);

await mongo.close();
