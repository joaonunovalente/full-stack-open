const Part = (props) => {
  return (
    <>
      <p>
        {props.part} has {props.exercise} exercises.
      </p>
    </>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>
        {props.name}
      </h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.part} exercise={props.exercises}/>        
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises is {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}.

      </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [{
    name: 'Fundamentals of React',
    exercises: 10
  },
  {
    name: 'Using props to pass data',
    exercises: 7
  },
  {
    name: 'State of a component',
    exercises: 14
  }]

  const test = [0, 1, 2]
  return (
    <>
      <Header name={course} />
      < Content part={parts[0].name} exercise={parts[0].exercises}/>
      < Content part={parts[1].name} exercise={parts[1].exercises}/>
      < Content part={parts[2].name} exercise={parts[2].exercises}/>
      < Total parts={parts} />
    </>
  )
}

export default App