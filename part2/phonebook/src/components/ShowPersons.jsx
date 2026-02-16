const ShowPersons = ({ personsToShow, removePerson }) => {
  return (
    <ul>
      {personsToShow.map((person) => (
        <li key={person.id}>
          {person.name}: {person.number}           
          <button onClick={() => removePerson(person.id)}>delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ShowPersons;
