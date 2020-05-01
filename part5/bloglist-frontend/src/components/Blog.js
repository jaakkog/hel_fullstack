/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, eraseBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 4,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5,
    fontSize: '16px',
  }


  const [visible, setVisible] = useState(false)
  const [author, setAuthor] = useState(blog.author)
  const [title, setTitle] = useState(blog.title)
  const [url, setUrl] = useState(blog.url)
  const [likes, setLikes] = useState(blog.likes)
  const [id, setId] = useState(blog.id)

  const likeBlog = (event) => {
    event.preventDefault()
    console.log('toimii')
    updateBlog({
      title: title,
      author: author,
      url: url,
      likes: likes + 1,
      id: id,
    })
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    eraseBlog({
      id: id
    })
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const showDelete = () => {
    if (user.username === blog.user.username) {
      return (
        <button id="delete" onClick={deleteBlog}>delete</button>
      )
    }
  }

  return (
    <div style={blogStyle} className="blogInfo">
      <p id="blogInfo">
        {blog.title}
        {blog.author}
      </p>
      <button id="view" onClick={toggleVisibility}>view</button>
      <div style={showWhenVisible}>
        <p>{blog.url}</p> <p id="numLikes">{blog.likes}</p> <button id="like" onClick={likeBlog}>like</button>
        {showDelete()}
      </div>
    </div>
  )
}
export default Blog
