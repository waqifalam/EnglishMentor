/* eslint-disable @typescript-eslint/no-var-requires */
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDef = protoLoader.loadSync('messages.proto', {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const { messagesPackage } = grpcObject;

const messageApiClient = new messagesPackage.MessagesService('localhost:50052', 
grpc.credentials.createInsecure())

export default messageApiClient;
