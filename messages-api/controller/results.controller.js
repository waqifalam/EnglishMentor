const Logger = require('../lib/Logger');
const { MongoController } = require('../lib/MongoClient');

const getResults = (call) => {
  const { uuid } = call.request;
  // Get all transcripts from mongo for the uuid

  MongoController.getTranscripts(uuid)
    .then((userTranscript) => {
      if (!userTranscript) call.end();
      else {
        const { transcripts } = userTranscript;
        transcripts.forEach((transcript) => call.write(transcript));
        call.end();
      }
    })
    .catch((error) => {
      Logger.error(`Error getting transcripts from MongoDB ${error.message}`);
      call.end();
    });
};

module.exports = {
  getResults,
};
