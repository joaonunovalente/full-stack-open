import { useState } from 'react'

const Name = ({ name }) => <p>{name}</p>

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [showAll, setShowAll] = useState(true)
 
  const addName = (event) => {
    event.preventDefault()

    if (preventRepeatName()){
      alert(`${newName} is already added to phonebook`)

    }
    else {
      const personObject = {
        name: newName,
        important: Math.random() < 0.5,
        id: persons.length + 1,
      }

      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const namesToShow = showAll
    ? persons
    : persons.filter(person => person.important)


  // Callback function. It receives array[i] element
  // It return true or false
  function fun(person){
    return person.name === newName
  }

  const preventRepeatName = () => {
    return persons.some(fun)    
  }

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