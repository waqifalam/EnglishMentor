const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDef = protoLoader.loadSync('questions.proto', {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const { questionsPackage } = grpcObject;

const server = new grpc.Server();

module.exports = {
  server,
  questionsPackage,
};
