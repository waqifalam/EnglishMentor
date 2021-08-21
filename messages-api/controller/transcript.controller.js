const { v4 } = require('uuid');

const { MongoController } = require('../lib/MongoClient');
const PusherClient = require('../lib/PusherClient');

const sendTranscript = (call, callback) => {
  const { transcriptItem, uuid } = call.request;
  const { text } = transcriptItem;
  callback(null, null);

  // Add correction
  const transcript = {
    id: v4(),
    text,
    correction: '',
  };
  MongoController.sendTranscript(uuid, transcript);
  // Send to PusherJS
  PusherClient.sendTranscript(uuid, transcript);
};

module.exports = {
  sendTranscript,
};
