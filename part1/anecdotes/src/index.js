import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState([0,0,0,0,0,0])

  const randomQuote = () => setSelected(Math.floor(Math.random() * anecdotes.length))


// Method for giving the vote. Clones the array and then updates the vote count regarding the displayed anecdote.
  const giveVote = () => {
    const copy = [...votes]
    return (
    setVote(copy, [copy[selected] += 1])
    )
  }

// Rendering the quote with the most votes and also display the vote count.

  const MostVotes = (props) => {
    
    let i = votes.indexOf(Math.max(...votes))
    return(
      <div>
        <p>
          {props.anecdotes[i]}<br></br>
          has {Math.max(...votes)} votes
        </p>
      </div>
    )
  }

  return (
    <div>
    <h1>Anecdote of the Day</h1>
      {props.anecdotes[selected]}
      <br></br>
      has {votes[selected]} votes
      <br></br>
      <button onClick={giveVote}>Vote</button>
      <button onClick={randomQuote}>Next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <MostVotes anecdotes={anecdotes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
