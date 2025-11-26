const Course = ({course}) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
    </div>
  )
}

const Header = (props) => <h1>{props.course.name}</h1>


const Content = ({parts}) => (
  <div>
    <Part parts={parts} />
    <Total parts={parts} />
  </div>
)

const Part = ({parts}) => {
  return (
    <div>
      {parts.map(part => 
        <p key={part.id}>{part.name}: {part.exercises}</p>
      )}
    </div>
  )
}

const Total = ({parts}) => {
  return(
    <>
      <b>total of {getTotalNumberOfExercises(parts)} exercises</b>
    </>
  )
}

const getTotalNumberOfExercises = (parts) => parts.reduce((s,p) => s + p.exercises, 0)

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App