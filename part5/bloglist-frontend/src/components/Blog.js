/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import { Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


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
        <Button variant="contained"
        color="secondary"
        startIcon={<DeleteIcon />} id="delete" onClick={deleteBlog}>delete</Button>
      )
    }
  }

  return (
    <div className="blogInfo">
    <TableContainer component={Card}>
    <div></div>
    <TableHead>
      <TableCell id="blogInfo">
        {blog.title}
        {blog.author}
      </TableCell>
      </TableHead>
      <Button color="default" variant="contained" startIcon={<ExpandMoreIcon />} id="view" onClick={toggleVisibility}>view</Button>
      <div style={showWhenVisible}>
        <TableCell align="right"> Url: {blog.url}</TableCell> <TableCell id="numLikes"> likes: {blog.likes}</TableCell> 
        <Tooltip>
        <Button variant="contained" color="primary" startIcon={<ThumbUpAltIcon />} id="like" onClick={likeBlog}>like</Button>
        </Tooltip>
        {showDelete()}
      </div>
      </TableContainer>
    </div>
  )
}
export default Blog
