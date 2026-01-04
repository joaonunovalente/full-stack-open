import axios from 'axios'
import { useState, useEffect } from 'react'
import SearchCountry from './components/SearchCountry'
import ShowCountries from './components/ShowCountries'

function App() {
  // State variables
  const [input, setInput] = useState("")
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [oneCountry, setOneCountry] = useState(null)
  console.log("Rendering")

  // Effect that fetch the API data
  useEffect(() => {
    const url_base = 'https://studies.cs.helsinki.fi/restcountries/api/all'
    axios
      .get(url_base)
      .then(getCountiesList)
  }, [])

  function getCountiesList(response) {
    const list = []
    const data = response.data
    for (let i = 0; i < data.length; i++) {
      list.push(data[i].name.common)
    }
    setCountries(list)
  }

  // Filter countries according to the input value
  useEffect(() => filterCountries(), [input])

  function filterCountries() {
    const list = countries.filter(checkCountries)
    setFilteredCountries(list)
  }

  function checkCountries(country) {
    return country.toLowerCase().includes(input.toLowerCase())
  }

  // Busca dados detalhados de um país quando só há um país filtrado
  useEffect(() => {
    if (filteredCountries.length === 1) {
      const countryName = filteredCountries[0];
      const url = `https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`;
      axios
        .get(url)
        .then(getCountryData)
        .catch((error) => {
          console.error("Error: no country found", error);
        });
    }
  }, [filteredCountries]);

  function getCountryData(response) {
    const data = response.data
    setOneCountry(data)
    console.log(data)
  }


  return (
    <>
      <SearchCountry input={input} setInput={setInput} />
      <ShowCountries filteredCountries={filteredCountries} oneCountry={oneCountry} />
    </>
  )
}

export default App