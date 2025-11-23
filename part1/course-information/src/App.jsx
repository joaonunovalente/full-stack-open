const Part = (props) => {
  return (
    <>
      <p>
        {props.part} has {props.exercise} exercises.
      </p>
    </>
  )
}

const Header = (course) => {
  return (
    <div>
      <h1>
        {course.name}
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
        Number of exercises is {props.exercises1 + props.exercises2 + props.exercises3}.
      </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <>
      <Header name={course} />
      < Content part={part1.name} exercise={part1.exercises}/>
      < Content part={part2.name} exercise={part2.exercises}/>
      < Content part={part3.name} exercise={part3.exercises}/>
      < Total exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises} />
    </>
  )
}

export default App