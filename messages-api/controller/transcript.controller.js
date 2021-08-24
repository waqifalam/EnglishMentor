const { v4 } = require('uuid');

const { MongoController } = require('../lib/MongoClient');
const PusherClient = require('../lib/PusherClient');
const { getCorrections } = require('../lib/EnglishCorrection');
const Logger = require('../lib/Logger');

const dbSaveAndPushResult = (uuid, transcript) => {
  // Save to MongoDB
  MongoController.sendTranscript(uuid, transcript);
  // Send to PusherJS
  PusherClient.sendTranscript(uuid, transcript);
};

const sendTranscript = (call, callback) => {
  const { transcriptItem, uuid } = call.request;
  const { text, id } = transcriptItem;
  callback(null, null);

  const defaultTranscript = {
    id,
    text,
  };

  console.log(defaultTranscript);

  // Add correction
  getCorrections(text)
    .then((correction) => {
      const transcript = {
        ...defaultTranscript,
        correction,
      };

      dbSaveAndPushResult(uuid, transcript);
    })
    .catch((error) => {
      Logger.error(`Error when getting correction from English API ${error.message}`);
      const transcript = {
        ...defaultTranscript,
        correction: [{ status: 'error ' }],
      };

      dbSaveAndPushResult(uuid, transcript);
    });
};

module.exports = {
  sendTranscript,
};
