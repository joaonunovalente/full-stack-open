import { useState } from 'react'

const Name = ({ name, number }) => <p>{name} {number} </p>

const App = () => {
  // const [persons, setPersons] = useState([]) 
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [showAll, setShowAll] = useState(true)
 
  const addName = (event) => {
    event.preventDefault()

    if (preventRepeatName()){
      alert(`${newName} is already added to phonebook`)

    }
    else {
      const personObject = {
        name: newName,
        number: newPhone,
        id: persons.length + 1,
      }

      setPersons(persons.concat(personObject))
      setNewName('')
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

  function funNamesToShow(person){
    return person.name.toLowerCase().includes(newSearch.toLowerCase())
  }
  const namesToShow = persons.filter(funNamesToShow)

  // Callback function. It receives array[i] element
  // It return true or false
  function funPreventRepeatName(person){
    return person.name === newName
  }

  const preventRepeatName = () => {
    return persons.some(funPreventRepeatName)    
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        Filter shown with: 
        <input 
            value={newSearch} 
            onChange={handleSearch}
        />
      </div>
      
      <h2>Add an entry</h2>
      <form onSubmit={addName}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <br></br>
        <div>
          number: 
          <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <br></br>
        <div>
          <button type="submit">
            Add entry
          </button>
        </div>
      </form>
      <h2>Name and Number</h2>
      {namesToShow.map(person =>
        <Name key={person.id} name={person.name} number={person.number}/>
      )}
    </div>
  )
}

export default App