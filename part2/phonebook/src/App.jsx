import { useState, useEffect } from "react";
import personService from "./services/personService";
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
    personService.getAll().then((initialPersons) => {
      console.log("getAll persons promise fulfilled");
      setPersons(initialPersons);
    });
  }, []);

  const addPersonForm = (event) => {
    event.preventDefault();
    if (persons.some((item) => item.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: String(
          persons.length > 0 ? Math.max(...persons.map((p) => p.id)) + 1 : 1,
        ),
      };
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");

      personService
        .create(personObject)
        .then(() => console.log("The POST method to create a new person..."));
    }
  };

  const removePerson = (name, id) => {
    console.log("Button clicked to remove person...");

    if (window.confirm(`Do you want to delete the record of ${name}?`)) {
      personService
        .remove(id)
        .then(setPersons(persons.filter((person) => person.id != id)));
    } else {
      console.log("No person was delete");
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
      <ShowPersons personsToShow={personsToShow} removePerson={removePerson} />
    </div>
  );
};

export default App;
