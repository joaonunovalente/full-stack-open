import axios from 'axios'
const baseurl = "http://localhost:3001/persons"

const getAll = () => {
    return axios.get(baseurl)
}

const create = newObject => {
    return axios.post(baseurl, newObject)
}

const deletePerson = id => {
     return axios.delete(`${baseurl}/${id}`)
}

const update = (id, updateObject) => {
    console.log(updateObject)
    return axios.put(`${baseurl}/${id}`, updateObject)
}

export default {
    getAll: getAll,
    create: create,
    deletePerson: deletePerson,
    update: update,
}