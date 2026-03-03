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
    <p>
      <b>total of {getTotalNumberOfExercises(parts)} exercises</b>
    </p>
  )
}

const getTotalNumberOfExercises = (parts) => parts.reduce((s,p) => s + p.exercises, 0)

export default Course