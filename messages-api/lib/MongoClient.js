const { MongoClient } = require('mongodb');
const Logger = require('./Logger');

let db;
const mongoConfigs = {
  connectionOptions: {
    maxPoolSize: Number(process.env.MONGO_POOLSIZE) || 10,
    wtimeoutMS: 2500,
    useNewUrlParser: true,
  },
  mongoUri: process.env.MONGO_URI,
};

MongoClient.connect(mongoConfigs.mongoUri, mongoConfigs.connectionOptions, (err, database) => {
  if (err) {
    Logger.error(`Could not connect to MongoDB ${err.message}`);
  }

  Logger.info('Connected to MongoDB');
  db = database.db(process.env.DB_NAME);
});

const MongoController = {
  async getTranscripts(uuid) {
    const collection = await db.collection(process.env.TRANSCRIPTS_COLLECTION);
    const userTranscript = await collection.findOne({ uuid });
    return userTranscript;
  },

  async sendTranscript(uuid, transcript) {
    const collection = await db.collection(process.env.TRANSCRIPTS_COLLECTION);
    const userTranscript = await collection.findOne({ uuid });
    if (userTranscript) {
      collection.updateOne(
        { uuid },
        { $push: { transcripts: transcript } },
      );
    } else {
      const newUserTranscript = {
        uuid,
        transcripts: [transcript],
      };
      collection.insertOne(newUserTranscript);
    }
  },
};

module.exports = {
  MongoController,
};
