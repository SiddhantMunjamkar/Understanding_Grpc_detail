import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, "../../proto/person.proto")
);

const personProto = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as grpc.GrpcObject;

// This client object
const client = new ((personProto as any).person
  .PersonService as grpc.ServiceClientConstructor)(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

client.AddPerson(
  { name: "Kingsiddhant", age: 21 },
  (err: grpc.ServiceError | null, response: any) => {
    if (err) {
      console.error("Error adding person:", err);
    } else {
      console.log("Added person:", response);
    }
  }
);

client.GetPerson({}, (err: grpc.ServiceError | null, response: any) => {
  if (err) {
    console.error("Error getting persons:", err);
  } else {
    console.log("Persons list:", response.persons);
  }
});
