const FilterNameInput = ({ handleFilterNameChange }) => {
  return (
    <div>
      Filter shown with: <input onChange={handleFilterNameChange} />
    </div>
  );
};

export default FilterNameInput
