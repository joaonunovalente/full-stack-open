/**
 * ShowCountries Component.
 *
 * Displays a list of countries or detailed information about a single country,
 * depending on the number of filtered results.
 */

const ShowButton = ({setFilteredCountries, country}) =>{
  console.log("button")

  function handleShowButton(){
    setFilteredCountries([country])    
  }

  return (
    <button onClick={handleShowButton}>Show</button>
  )
} 

const ShowCountries = ({setFilteredCountries, filteredCountries, oneCountry, weatherData }) => {
  // If only one country matches, show detailed information
  if (filteredCountries.length === 1 && oneCountry) {
    // Convert the 'languages' object into an array of language names
    const languages = Object.values(oneCountry.languages);

    return (
      <div>
        <h1>{oneCountry.name.common}</h1>
        <p>Capital: {oneCountry.capital[0]}</p>
        <p>Area: {oneCountry.area} km²</p>

        <h2>Languages</h2>
        <ul aria-label="Languages spoken in the country">
          {languages.map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>

        <img
          src={oneCountry.flags.png}
          alt={`Flag of ${oneCountry.name.common}`}
          style={{ maxWidth: '200px', border: '1px solid #ddd' }}
          />

        <h2>Weather in {oneCountry.name.common}</h2>
        <p>Temperature is {weatherData[0]}º Celsius</p>
        <img 
          src={`https://openweathermap.org/img/wn/${weatherData[1]}@2x.png`}
          />
        <p>Wind is {weatherData[2]} m/s</p>
      </div>
    );
  }

  // If there are too many matches, prompt the user to refine their search
  if (filteredCountries.length >= 10) {
    return (
      <div>
        <p>Too many matches, specify another filter.</p>
      </div>
    );
  }

  // Default: render a list of countries
  return (
    <div>
      {filteredCountries.map((country, index) => (
        <p key={index}>
          {country}&nbsp;  
          <ShowButton setFilteredCountries={setFilteredCountries} country={country}/>
        </p>
      ))}
    </div>
  );
};

export default ShowCountries;
