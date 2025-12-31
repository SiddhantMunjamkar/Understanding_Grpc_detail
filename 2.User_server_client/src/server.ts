import path from "path";
import * as grpc from "@grpc/grpc-js";
import { GrpcObject, ServiceClientConstructor } from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { persons } from "./data/data";

const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, "../proto/person.proto")
);

const personProto = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as GrpcObject;

function AddPerson(
  call: grpc.ServerUnaryCall<any, any>,
  callback: grpc.sendUnaryData<any>
) {
  const person = call.request;
  persons.push(person);
  callback(null, person);
}

function GetPerson(
  call: grpc.ServerUnaryCall<any, any>,
  callback: grpc.sendUnaryData<any>
) {
  callback(null, { persons });
}

const server = new grpc.Server();
server.addService(
  ((personProto as any).person.PersonService as ServiceClientConstructor).service,
  {
    AddPerson,
    GetPerson,
  }
);

server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log(`grpc server is listening at  localhost:50051`);
  }
);
