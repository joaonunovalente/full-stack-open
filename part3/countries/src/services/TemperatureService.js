
import axios from 'axios';
const api_key = import.meta.env.VITE_SOME_KEY
// api_key = 68533ac8a01ac1acc44b3118c597171a

function getWeatherData(country){
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country}&units=metric&appid=${api_key}`)
}

 export default{
    get: getWeatherData
 }