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
      <History 
        good={props.good} 
        neutral={props.neutral} 
        bad={props.bad} 
        average={props.average} 
        positive={props.positive}  
        total={props.total} />
    </div>
  )
}

const StatisticLine = (props) => {
  return (
    <>
      <p>{props.text}: {props.value}</p>
    </>

  )
}

const History = ({good, neutral, bad, total, average, positive}) => {
  if (total === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
      <StatisticLine text="good" value = {good} />
      <StatisticLine text="neutral" value = {neutral} />
      <StatisticLine text="bad" value = {bad} />
      <StatisticLine text="total" value = {total} />
      <StatisticLine text="average" value = {average} />
      <StatisticLine text="positive" value = {positive} />
    </>
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