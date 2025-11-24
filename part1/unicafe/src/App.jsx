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
      <History good={props.good} neutral={props.neutral} bad={props.bad} average={props.average} total={props.total} />
    </div>
  )
}

const History = (props) => {
  if (props.total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <p>good: {props.good}</p>
      <p>neutral: {props.neutral}</p>
      <p>bad: {props.bad}</p>
      <p>all: {props.total}</p>
      <p>average: {props.average}</p>
      <p>positive: {props.positive} %</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  let average = 0
  let positive = 0

  const handleGood = () => {
    const newGood = good + 1
    setGood(newGood)
    computeAverage()
    computePositive()
    computeTotal()
  }

  const handleNeutral = () => {
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
    computeAverage()
    computePositive()
    computeTotal()
  }

  const handleBad = () => {
    const newBad = bad + 1
    setBad(newBad)
    computeAverage()
    computePositive()
    computeTotal()
  }

  const computeTotal = () => good + neutral + bad

  const computeAverage = () => {
    average = (good - bad) / (good + neutral + bad)
    return average
  }

  const computePositive = () => {
    positive = good * 100/ (good + neutral + bad)
    return positive 
  }

  return (
    <div>
      <Header />
      <Button onClick={() => handleGood()} text="good" />
      <Button onClick={() => handleNeutral()} text="neutral" />
      <Button onClick={() => handleBad()} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} average={computeAverage()} positive={computePositive()} total={computeTotal()} />
    </div>
  )
}

export default App