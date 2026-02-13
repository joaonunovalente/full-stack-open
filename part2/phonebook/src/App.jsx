import { useState, useEffect } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [personsToShow, setPersonsToShow] = useState(persons);

  useEffect(() => {
    setPersonsToShow(persons);
  }, [persons]);

  const addPersonForm = (event) => {
    event.preventDefault();
    if (persons.some(item => item.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length > 0 ? Math.max(...persons.map(p => p.id)) + 1 : 1
      };
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
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
    const filtered = persons.filter(person =>
      person.name.toLowerCase().includes(value.toLowerCase())
    );
    setPersonsToShow(filtered);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with: <input onChange={handleFilterNameChange} />
      </div>
      <h3>Add a new</h3>
      <form onSubmit={addPersonForm}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person =>
          <li key={person.id}>{person.name}: {person.number}</li>
        )}
      </ul>
    </div>
  );
};

export default App;
