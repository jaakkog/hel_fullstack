import React from 'react'

const SingleBlog = ( { blog } ) => {

  if (!blog) {
    return null
  }
  console.log(blog)
  return (
    <div>
      <h1>{blog.title}</h1>
      <h4>{blog.url}</h4>
      <p>added by {blog.user.name}</p>
    </div>
  )
}

export default SingleBlog