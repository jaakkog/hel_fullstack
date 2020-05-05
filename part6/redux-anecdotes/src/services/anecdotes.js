import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const voteAnecdote = async (content) => {
  console.log('service content', content)
  const response = await axios.get(`${baseUrl}/${content.id}`, content)
  console.log('response', response)
  return response.data
}



export default { getAll, createNew, voteAnecdote }