/* eslint-disable no-unused-vars */
import axios from 'axios'
const baseUrl = '/'

const getUsers = async () => {
  const request = axios.get('/api/users')
  const response = await request
  console.log(response.data)
  return response.data
}

export default { getUsers }
