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

export default PersonForm