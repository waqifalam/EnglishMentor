const grpc = require('@grpc/grpc-js');
require('dotenv').config();

const { server, questionsPackage } = require('./grpcConfigs');
const { getQuestionController } = require('./controller/QuestionController');
const Logger = require('./lib/Logger');

server.addService(questionsPackage.QuestionsService.service, {
  getQuestion: (_, callback) => {
    getQuestionController(callback);
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
