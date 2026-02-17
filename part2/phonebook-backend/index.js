const express = require("express");
const app = express();

app.use(express.json())

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
  const id = request.params.id
  const note = persons.find((note) => note.id === id)
  note
    ? response.json(note)
    : response.status(404).end()
  
  console.log("- - - DEBUG - - - Person id =", id)
})

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id
  persons = persons.filter((person) => person.id !== id)
  response.status(204).end()
})


app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'name is  missing',
    })
  }

  const person = {
    name: body.name,
    number: body.number || "",
    id: String(Math.floor(Math.random() * 100_000)),
  }

  persons = persons.concat(person)

  response.json(persons)
})
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
