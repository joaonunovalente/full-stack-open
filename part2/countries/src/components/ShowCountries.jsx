const ShowCountries = ({ filteredCountries, oneCountry }) => {
  if (filteredCountries.length === 1 && oneCountry) {
    const languages = Object.values(oneCountry.languages) // Transform 'languages' object into list
    return (
      <div>
        <h1>{oneCountry.name.common}</h1>
        <p>Capital: {oneCountry.capital[0]}</p>
        <p>Area: {oneCountry.area}</p>
        <h2>Languages</h2>
        <ul>
          {languages.map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img src={oneCountry.flags.png} alt="" />
      </div>
    )
  }
  if (filteredCountries.length >= 10) {
    return (
      <div>
        <p>Too many matches, specify another filter.</p>
      </div>
    )
  }
  return (
    <div>
      {filteredCountries.map((country, index) => (
        <p key={index}>{country}</p>
      ))}
    </div>
  )
}

export default ShowCountries