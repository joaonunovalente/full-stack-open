import { useState, useEffect } from 'react'
import personService from './services/persons'



const Name = ({ name, number }) => <p>{name} {number} </p>

const Filter = ({ newSearch, handleSearch }) => {
  return (
    <div>
      Filter shown with: <input value={newSearch} onChange={handleSearch} />
    </div>
  )
}

const Persons = ({ namesToShow }) => namesToShow.map(person => <Name key={person.id} name={person.name} number={person.number} />)

const PersonForm = ({ addName, newName, newPhone, handleNameChange, handlePhoneChange }) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <br></br>
      <div>
        number: <input value={newPhone} onChange={handlePhoneChange} />
      </div>
      <br></br>
      <div>
        <button type="submit">Add entry</button>
      </div>
    </form>
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
        id: persons.length + 1,
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
      <h2>Name and Number</h2>
      <Persons namesToShow={namesToShow} />
    </div>
  )
}

export default App