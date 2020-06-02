import React from 'react'

const SingleUser = ( { user } ) => {

  if (!user) {
    return null
  }
  console.log(user)
  return (
    <div>
      <h1>{user.name}</h1>
      <h4>Added blogs:</h4>
      {user.blogs.map(x =>
        <li key={x.id}>{x.title}</li>)}
    </div>
  )
}

export default SingleUser