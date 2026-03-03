import axios from 'axios';
const base_url = "https://studies.cs.helsinki.fi/restcountries/api/"

function getCountries(){
    return axios.get(base_url+"all")
}

function getCountry(country){
    return axios.get(`${base_url}name/${country}`)
}

export default {
    getCountries: getCountries,
    getCountry: getCountry
}
