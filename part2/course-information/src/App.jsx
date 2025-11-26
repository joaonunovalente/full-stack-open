export const Courses = ({courses}) => {
  return (
    <div>
      {courses.map(course => (
        <Course key={course.id} course={course} />
      ))}      
    </div>
  )
}


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

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Courses courses={courses} />
}

export default App