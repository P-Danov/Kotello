import React from 'react'

const Job = (props) => {
  return (
    <div>
      <p>{props.salary}</p>
      <p>{props.position}</p>
    </div>
  )
}

export default Job