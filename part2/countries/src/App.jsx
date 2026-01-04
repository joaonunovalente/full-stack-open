import { useState, useEffect } from 'react';
import SearchCountry from './components/SearchCountry';
import ShowCountries from './components/ShowCountries';
import CountriesService from './services/CountriesService'

function App() {
  // State variables
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [oneCountry, setOneCountry] = useState(null);

  // --------------

  // Fetch all countries data on component mount
  useEffect(() => {
    CountriesService
      .getCountries()
      .then(getCountriesList)
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  /**
   * Extracts the common names of all countries from the API response.
   * @param {Object} response - Axios response object.
   */
  function getCountriesList(response) {
    const countryNames = response.data.map(country => country.name.common);
    setCountries(countryNames);
  }

  // --------------

  // Filter countries whenever the input changes
  useEffect(() => {
    filterCountries();
  }, [input, countries]);

  /**
   * Filters the countries list based on the current input value.
   */
  function filterCountries() {
    const filteredList = countries.filter(country =>
      country.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredCountries(filteredList);
  }

  // --------------

  // Fetch detailed data for a single country when only one match is found
  useEffect(() => {
    if (filteredCountries.length === 1) {
      const countryName = filteredCountries[0];
      console.log(countryName)
      CountriesService
        .getCountry(countryName)
        .then(getCountryData)
        .catch((error) => {
          console.error("Error fetching country details:", error);
        });
    } else {
      // Clear detailed country data if there are zero or multiple matches
      setOneCountry(null);
    }
  }, [filteredCountries]);

  /**
   * Sets the detailed country data in state.
   * @param {Object} response - Axios response object.
   */
  function getCountryData(response) {
    const data = response.data;
    setOneCountry(data);
  }

  return (
    <>
      <SearchCountry input={input} setInput={setInput} />
      <ShowCountries setInput={setInput} filteredCountries={filteredCountries} oneCountry={oneCountry} />
    </>
  );
}

export default App;
