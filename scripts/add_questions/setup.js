const { readFileSync } = require("fs");
const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbName = "messages-db";
const collectionName = "questions";
const filename = "questions.json";

try {
  const rawdata = readFileSync(filename);
  const questions = JSON.parse(rawdata);
  const questionsFormatted = questions.map((question) => {
    return {
      question,
    };
  });
  console.log("==========================FORMATTED_QUESTIONS==========================");
  console.log(questionsFormatted);
  console.log("==========================FORMATTED_QUESTIONS==========================");

  async function insertQuestions(client, dbName, collectionName, questionsFormatted) {
    await client.connect();
    console.log("Connected successfully to db");
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    await collection.deleteMany();
    await collection.insertMany(questionsFormatted);
    console.log("Finished inserting all the formatted questions");
  }

  const client = new MongoClient(url);

  insertQuestions(client, dbName, collectionName, questionsFormatted)
    .catch(console.error)
    .finally(() => client.close());
} catch (e) {
  console.log(`Error occured: ${e.message}`);
  process.exit(3);
}
