import { useState } from 'react'

const Name = ({ name }) => <p>{name}</p>

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [showAll, setShowAll] = useState(true)
 
  const addName = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      important: Math.random() < 0.5,
      id: persons.length + 1,
    }

    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const namesToShow = showAll
    ? persons
    : persons.filter(person => person.important)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Names</h2>
      {namesToShow.map(person =>
        <Name key={person.id} name={person.name} />
      )}
    </div>
  )
}


export default App