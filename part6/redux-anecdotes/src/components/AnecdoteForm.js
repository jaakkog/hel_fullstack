import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { newAnecdoteNotification } from '../reducers/notificationReducer'
import {connect} from 'react-redux'

const NewAnecdote = (props) => {
  
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.newAnecdoteNotification(content)
    setTimeout(() => props.newAnecdoteNotification(''), 2000)    
  }

  return (
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">create</button>
    </form>
  )
}
const mapDispatchToProps = {
  createAnecdote,
  newAnecdoteNotification
}

export default connect(null, mapDispatchToProps)(NewAnecdote)