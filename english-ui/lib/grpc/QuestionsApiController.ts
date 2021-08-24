const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDef = protoLoader.loadSync('questions.proto', {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const { questionsPackage } = grpcObject;

const questionsApiClient = new questionsPackage.QuestionsService('localhost:50051', 
grpc.credentials.createInsecure())

export default questionsApiClient;
