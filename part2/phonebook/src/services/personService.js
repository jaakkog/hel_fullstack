import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => axios.get(baseUrl)

const create = (newObject) => axios.post(baseUrl, newObject)

const erase = (id) => axios.delete(`${baseUrl}/${id}`)

const replace = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject)

export default {
  getAll, create, erase, replace,
}
