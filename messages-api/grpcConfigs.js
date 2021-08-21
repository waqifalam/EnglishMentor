const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDef = protoLoader.loadSync('messages.proto', {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const { messagesPackage } = grpcObject;

const server = new grpc.Server();

module.exports = {
  server,
  messagesPackage,
};
