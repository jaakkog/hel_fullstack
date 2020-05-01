/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  setVisibility,
  createBlog,
}) => {

  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [newBlog, setNewBlog] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })
    setNewBlog('')
  }

  return (
    <div>
      <h2>Add new</h2>
      <form onSubmit={addBlog}>
        <div className='input'>
          <div>
      Title:
            <input
              id='title'
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
      Author:
            <input
              id='author'
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
      Url:
            <input
              id="url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
        </div>
        <button className="submit" type="submit" onClick={setVisibility}>create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  setVisibility: PropTypes.func.isRequired,
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm