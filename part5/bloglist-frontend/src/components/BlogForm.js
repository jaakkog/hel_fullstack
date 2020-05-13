/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import CreateIcon from '@material-ui/icons/Create'

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
            <TextField label="Title"
              id='title'
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            ></TextField>
          </div>
          <div>
            <TextField
              label="Author"
              id='author'
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            ></TextField>
          </div>
          <div>
            <TextField
              label="Url"
              id="url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            ></TextField>
          </div>
          <br></br>
        </div>
        <Button variant="contained" color="primary" startIcon={<CreateIcon />} className="submit" type="submit" onClick={setVisibility}>create</Button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  setVisibility: PropTypes.func.isRequired,
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm