const Filter = ({ newSearch, handleSearch }) => {
  return (
    <div>
      Filter shown with: <input value={newSearch} onChange={handleSearch} />
    </div>
  )
}

export default Filter