const grpc = require('@grpc/grpc-js');
require('dotenv').config();

const { server, messagesPackage } = require('./grpcConfigs');
const Logger = require('./lib/Logger');
const { getResults } = require('./controller/results.controller');
const { sendTranscript } = require('./controller/transcript.controller');

server.addService(messagesPackage.MessagesService.service, {
  sendTranscript: (call, callback) => {
    sendTranscript(call, callback);
  },

  getResults: (call) => {
    getResults(call);
  },
});

const { PORT } = process.env;
server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  () => {
    Logger.info(`Server running at http://0.0.0.0:${PORT}`);
    server.start();
  },
);
