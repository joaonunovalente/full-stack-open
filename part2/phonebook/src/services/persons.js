import axios from 'axios'
const baseurl = "http://localhost:3001/persons"

const getAll = () => {
    return axios.get(baseurl)
}

const create = newObject => {
    return axios.post(baseurl, newObject)
}

const deletePerson = id => {
     axios.delete(`${baseurl}/${id}`)
}

export default {
    getAll: getAll,
    create: create,
    deletePerson: deletePerson,
}