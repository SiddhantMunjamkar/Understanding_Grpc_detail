import * as protobufjs from "protobufjs";
import * as fs from "fs";

const protobuf = protobufjs;
// Load the Protocol Buffer schema
protobuf
  .load("a.proto")
  .then((root) => {
    // Obtain  the Person message type
    const Person = root.lookupType("Person");

    // Create a new Person instance
    const person = { name: "Alice", age: 30 };

    // Serialize Person to a buffer
    const buffer = Person.encode(person).finish();

    // Write buffer to a file
    fs.writeFileSync("person.bin", buffer);

    console.log("Person serialized and saved to person.bin");

    // Read the buffer to a file
    const data = fs.readFileSync("person.bin");

    // Deserialize the Person instance
    const deserializedPerson = Person.decode(data);

    console.log("Person deserialized from person.bin:", deserializedPerson);

    // Deserialize the Person instance
  })
  .catch((err) => {
    console.error(err);
  });
