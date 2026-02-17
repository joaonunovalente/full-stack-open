const express = require("express");
const morgan = require('morgan')

const app = express();

app.use(express.json());
app.use(morgan('combined'))

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
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

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  console.log("- - - DEBUG - - -",persons.find((person) => person.name === body.name))

  if (!body.name) {
    return response.status(400).json({
      error: "Name is  missing",
    });
  } else if (!body.number) {
    return response.status(400).json({
      error: "Number is  missing",
    });
  } else if (persons.find((person) => person.name === body.name)) {
    return response.status(400).json({
      error: "The name already exists in the phonebook",
    });
  }

  const person = {
    id: String(Math.floor(Math.random() * 100_000)),
    name: body.name,
    number: body.number || "",
  };

  persons = persons.concat(person);

  response.json(persons);
});

morgan('tiny')

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
