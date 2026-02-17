const express = require("express");
const app = express();

let notes = [
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
  response.json(notes);
});

app.get("/info", (request, response) => {
  console.log("Here lays the info...");

  let number_of_notes = notes.length;
  let currentDate = new Date().toString();

  let message = `
    <p>
        Phonebook has info for ${number_of_notes} people
        <br><br>
        ${currentDate}
    </p>
    `;
  response.send(message);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id
  const note = notes.find((note) => note.id === id)
  note
    ? response.json(note)
    : response.status(404).end()
  
  console.log("- - - DEBUG - - - Person id =", id)
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
