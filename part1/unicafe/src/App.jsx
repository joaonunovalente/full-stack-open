import { useState } from 'react'

const Header = () => <h1>give feedback</h1>
const Button = (props) =>{
  return(
  <button onClick={props.onClick}>{props.text}</button>
  )
}

const Statistics = (props) => {
  return(
    <div>
      <h1>statistics</h1>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    const newGood = good + 1
    setGood(newGood)
  }

  const handleNeutral = () => {
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
  }

  const handleBad = () => {
    const newBad = bad + 1
    setBad(newBad)
  }

  return (
    <div>
      <Header />
      <Button onClick={() => handleGood()} text="good" />
      <Button onClick={() => handleNeutral()} text="neutral" />
      <Button onClick={() => handleBad()} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App