const mongoose = require("mongoose");

if (process.argv.length === 2) {
  console.log("Give password as argument.");
  process.exit(1);
}

const password = process.argv[2];
const name_input = process.argv[3];
const number_input = process.argv[4];

const url = `mongodb+srv://fullstack:${password}@cluster0.2k5dikm.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url, { family: 4 });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log("phonebook:\n")
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}

if (process.argv.length > 3) {
  const person = new Person({
    name: name_input,
    number: number_input,
  });

  person.save().then((result) => {
    console.log(`added ${name_input} ${number_input} to phonebook`);
    mongoose.connection.close();
  });
}
