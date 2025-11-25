import { useState } from 'react'

function DisplayAnacdote(props){
  return (
    <>
    <h1>Anacdote of the day</h1>
      <p>{props.anecdote}</p>
    </>
  )
}

function DisplayVotes(props){
  return(
    <p>has {props.votes} votes</p>
  )
}

const ButtonNextJoke = ({onClick, text}) => {
  return(
    <>
      <button onClick={onClick}>{text}</button>
    </>
  )
}

const ButtonVote = ({onClick, text}) => {
  return(
    <>
      <button onClick={onClick}>{text}</button>
    </>
  )
}

const AnacdoteMostVotes = ({anacdote, votes}) => {
  return(
    <div>
      <h1>Anacdote with most votes</h1>
      <p>{anacdote}</p>
      <p>has {votes} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [voted, setVoted] = useState(Array(anecdotes.length ).fill(0))

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  function handleNextJoke(){
    setSelected(getRandomIntInclusive(0, anecdotes.length))
    getAnacdoteWithMostVotes()
  }

  function handleVote(){
    const copy = [...voted]
    copy[selected] += 1 
    setVoted(copy)
    getAnacdoteWithMostVotes()
  }

  function getAnacdoteWithMostVotes(){
    let anacdote = Math.max(...voted)
    let id = voted.indexOf(Math.max(...voted))
    return [anacdote, anecdotes[id]]
  }

  return (
    <div>
      <DisplayAnacdote anecdote={anecdotes[selected]}/>
      <DisplayVotes onClick={handleVote} votes={voted[selected]}/>
      <ButtonVote onClick={handleVote} text={"vote"} />
      <ButtonNextJoke onClick={handleNextJoke} text={"Next joke"} />
      <AnacdoteMostVotes anacdote={getAnacdoteWithMostVotes()[1]} votes={getAnacdoteWithMostVotes()[0]}/>
    </div>
  )
}

export default App