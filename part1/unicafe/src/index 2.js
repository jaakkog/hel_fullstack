import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  
  if(props.allClicks === 0){
    return (
      <div>
        No feedback given
      </div>
    )
  } 
      return (
        <div>
        <StatisticLine text="Good" value={props.good} />
        <StatisticLine text="Neutral" value={props.neutral} />
        <StatisticLine text="Bad" value={props.bad} />
        <StatisticLine text="All" value={props.good + props.bad + props.neutral}/>
        <StatisticLine text="Average" value={(props.good - props.bad) / props.allClicks} />
        <StatisticLine text="Positive" value={props.good/props.allClicks * 100 + ' %'} />
        </div>
    )
  }

const Button = (props) => {
  return (
    <div>
      <button onClick={props.handleGoodClick}>Good</button>
      <button onClick={props.handleNeutralClick}>Neutral</button>
      <button onClick={props.handleBadClick}>Bad</button>
    </div>
  )
}

const StatisticLine = (props) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>{props.text} {props.value}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}



const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)

  const handleGoodClick = () => {
    setAll(allClicks + 1)
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setAll(allClicks + 1)
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setAll(allClicks + 1)
    setBad(bad + 1)
  }




  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleGoodClick={handleGoodClick} handleNeutralClick={handleNeutralClick} handleBadClick={handleBadClick}/>
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
