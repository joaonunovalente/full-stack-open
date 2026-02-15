import { useState, useEffect } from "react";
import axios from "axios";
import FilterNameInput from "./components/FilterNameInput";
import PersonForm from "./components/PersonForm";
import ShowPersons from "./components/ShowPersons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [personsToShow, setPersonsToShow] = useState(persons);

  useEffect(() => {
    setPersonsToShow(persons);
  }, [persons]);

  useEffect(() => {
    console.log("The hook Axios is here...");
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        console.log("promise fulfilled");
        setPersons(response.data);
      })
  }, []);

  const addPersonForm = (event) => {
    event.preventDefault();
    if (persons.some((item) => item.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length > 0 ? Math.max(...persons.map((p) => p.id)) + 1 : 1,
      };
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterNameChange = (event) => {
    const value = event.target.value;
    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(value.toLowerCase()),
    );
    setPersonsToShow(filtered);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterNameInput handleFilterNameChange={handleFilterNameChange} />
      <h3>Add a new person</h3>
      <PersonForm
        addPersonForm={addPersonForm}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Persons and Numbers</h2>
      <ShowPersons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
