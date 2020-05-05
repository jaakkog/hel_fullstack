import React from 'react'
import { Vote } from '../reducers/anecdoteReducer'
import {connect} from 'react-redux'
import { votedNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const Anecdote = ({ anecdote, handleClick }) => {
    return(
      <div>
      <li>
        { anecdote.content }
      </li>
      <button onClick={handleClick}>Vote</button>
      <p> has {anecdote.votes} votes</p>
      </div>
    )
  }
  
  const AnecdoteList = (props) => {

    const anecdotes = props.anecdotes.filter(m => m.content.toLowerCase().includes(props.filter.content))
    console.log('propsifiltteri', props.filter.content)

    const combineClick = async (anecdote) => {
      console.log('klikkaa', anecdote)
      const votedAnecdote = await anecdoteService.voteAnecdote(anecdote)
      props.Vote(votedAnecdote)
      props.votedNotification(anecdote)
      setTimeout(() => (props.votedNotification('')), 2000)
    }




    return(
      <ul>
        {anecdotes.map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => 
              combineClick(anecdote)
            }
          />
        )}
      </ul>
    )
  }

  const mapStateToProps = (state) => {

    return({
        anecdotes: state.anecdotes,
        filter: state.filter
    })

}
  
  const mapDispatchToProps = {
    Vote,
    votedNotification
}

  export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)