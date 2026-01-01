import { useState, useEffect } from 'react'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const Persons = ({ namesToShow, handleDeletePerson }) => namesToShow.map(person => <Name key={person.id} id={person.id} name={person.name} number={person.number} handleDeletePerson={handleDeletePerson} />)

const Name = ({ id, name, number, handleDeletePerson }) => {
  return (
    <p>{name} {number} <button onClick={() => { handleDeletePerson(id) }}>Delete</button> </p>

  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  console.log('render', persons.length, 'persons')

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const addName = (event) => {
    event.preventDefault()

    if (preventRepeatName()) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    else {
      const personObject = {
        name: newName,
        number: newPhone,
        id: String(persons.length + 1),
      }

      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(personObject))
          setNewName('')
          setNewPhone('')
        })
    }
  }

  function handleDeletePerson(id) {
    if (window.confirm("Do you want to delete a person?")) {
      personService.deletePerson(id);
      personService
        .getAll()
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        })
    } else {
      log.innerText = "Glad you didn't.";
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }

  function funNamesToShow(person) {
    return person.name.toLowerCase().includes(newSearch.toLowerCase())
  }

  const namesToShow = persons.filter(funNamesToShow)

  // Callback function. It receives array[i] element
  // It return true or false
  function funPreventRepeatName(person) {
    return person.name === newName
  }

  const preventRepeatName = () => {
    return persons.some(funPreventRepeatName)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter newSearch={newSearch} handleSearch={handleSearch} />
      <h2>Add an entry</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        newPhone={newPhone}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
      />
      <br />
      <h2>Name and Number</h2>
      <Persons namesToShow={namesToShow} handleDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App