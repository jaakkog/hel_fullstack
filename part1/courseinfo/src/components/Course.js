import React from 'react';

const Course = (props) => {
  
    const Header = (props) => {
      return (
        <div>
          <h1>{props.course.name}</h1>
        </div>
      )
    }
    
    const Part = (props) => {
      return (
        props.course.parts.map(x => <p key={x.id}>{x.name} {x.exercises}</p>)
      )
    }
  
  
    const Total = ({course}) => {
      const numbers = course.parts.map(x => x.exercises)
    
      const sum = numbers.reduce((s,p) => {
        return (
          s + p
        )
      })
      return (
        <div>
        <h3>
          <b>Total of {sum} exercises</b>
          </h3>
        </div>
      )
    }
  
  
    const MapCourses = ( {course} ) => {
        return course.map((course) => <div key={course.id}>
            <Header key={course.id} course={course} />
            <Part key={course.id + 1} course={course} />
            <Total key={course.id + 1} course={course} />
        </div>);
    }
  
  
    return (
    <div>
      <Header course={props.course}/>
      <MapCourses key={props.course.id} course={props.course} />
    </div>
    )
  }

  export default Course