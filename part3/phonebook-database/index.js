require("dotenv").config();
const express = require("express");
const Person = require("./models/person");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(express.static("dist"));

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

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

  Person.find({}).then((persons) => {
    number_of_persons = persons.length;

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
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Person.findById(id).then((person) => {
    person ? response.json(person) : response.status(404).end();
    console.log("- - - DEBUG - - - Person id =", id);
  });
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  const person = new Person({
    name: body.name,
    number: body.number || "",
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.put("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  const { name, number } = request.body;

  Person.findById(id).then((person) => {
    if (!person) {
      return response.status(404).end();
    }

    person.name = name;
    person.number = number;

    return person
      .save()
      .then((updatedPerson) => {
        response.json(updatedPerson);
      })
      .catch((error) => next(error));
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
