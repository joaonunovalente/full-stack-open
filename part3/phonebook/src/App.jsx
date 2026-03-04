import { useState, useEffect, use } from "react";
import personService from "./services/personService";
import ErrorNotification from "./components/ErrorNotification";
import FilterNameInput from "./components/FilterNameInput";
import PersonForm from "./components/PersonForm";
import PersonNotification from "./components/PersonNotification";
import ShowPersons from "./components/ShowPersons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [personsToShow, setPersonsToShow] = useState(persons);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
      if (
        window.confirm(
          `${newName} is already added to the phonebook. Do you want to replace the old number with a new one?`,
        )
      ) {
        const oldPersonObject = persons.find(
          (person) => person.name === newName,
        );

        const personObject = {
          name: oldPersonObject.name,
          number: newNumber,
          id: oldPersonObject.id,
        };

        personService
          .update(personObject.id, personObject)
          .then(() =>
            setPersons(
              persons.map((person) =>
                person.id === personObject.id ? personObject : person,
              ),
            ),
          )
          .then(() => {
            setNotificationMessage(
              `'${personObject.name}'s number was updated!`,
            );
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          });
      } else {
        console.log("No person was delete");
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: String(
          persons.length > 0 ? Math.max(...persons.map((p) => p.id)) + 1 : 1,
        ),
      };

      personService
        .create(personObject)
        .then(() => {
          setPersons(persons.concat(personObject));
          setNewName("");
          setNewNumber("");
          setNotificationMessage(`'${personObject.name}' was added!`);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(`${error.response.data.error}`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  const removePerson = (name, id) => {
    console.log("Button clicked to remove person...");

    if (window.confirm(`Do you want to delete the record of ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          console.log("Showing people again...");
          setPersons(persons.filter((person) => person.id != id));
        })
        .catch((error) => {
          setErrorMessage(`${name} was already removed from the server.`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);

          setPersons(persons.filter((n) => n.id !== id));
        });
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
      <h1>Phonebook -Database</h1>
      <PersonNotification message={notificationMessage} />
      <ErrorNotification message={errorMessage} />
      <FilterNameInput handleFilterNameChange={handleFilterNameChange} />
      <h2>Add a new person</h2>
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
