require("dotenv").config();
const express = require("express");
const Person = require("./models/person");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(express.static("dist"));

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/info", (request, response) => {
  console.log("Here lays the info...");

  let number_of_persons = persons.length;
  let currentDate = new Date().toString();

  let message = `
    <p>
        Phonebook has info for ${number_of_persons} people
        <br><br>
        ${currentDate}
    </p>
    `;
  response.send(message);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const note = persons.find((note) => note.id === id);
  note ? response.json(note) : response.status(404).end();

  console.log("- - - DEBUG - - - Person id =", id);
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id)
  .then((result) => {
    response.status(204).end();
  })
  .catch(error => next(error))
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  // console.log(
  //   "- - - DEBUG - - -",
  //   persons.find((person) => person.name === body.name),
  // );

  // if (!body.name) {
  //   return response.status(400).json({
  //     error: "Name is  missing",
  //   });
  // } else if (!body.number) {
  //   return response.status(400).json({
  //     error: "Number is  missing",
  //   });
  // } else if (persons.find((person) => person.name === body.name)) {
  //   return response.status(400).json({
  //     error: "The name already exists in the phonebook",
  //   });
  // }

  const person = new Person({
    name: body.name,
    number: body.number || "",
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
