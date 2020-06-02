/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import DeleteIcon from '@material-ui/icons/Delete'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useRouteMatch
} from 'react-router-dom'
import SingleBlog from './SingleBlog'
import { TableBody } from '@material-ui/core'


const Blog = ({ blog, updateBlog, eraseBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 4,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5,
    fontSize: '16px',
  }

  console.log('blogin blogit', blog.map(x => x.title))


  const [visible, setVisible] = useState(false)
  const [author, setAuthor] = useState(blog.author)
  const [title, setTitle] = useState(blog.title)
  const [url, setUrl] = useState(blog.url)
  const [likes, setLikes] = useState(blog.likes)
  const [id, setId] = useState(blog.id)

  const likeBlog = (event) => {
    event.preventDefault()
    console.log('toimii', event)
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
  const showDelete = () => {
    return (
      <Button variant="contained"
        color="secondary"
        startIcon={<DeleteIcon />} id="delete" onClick={deleteBlog}>delete</Button>
    )
  }

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
      marginTop: 40,
    },
  })

  const classes = useStyles()

  const match = useRouteMatch('/blogs/:id')
  const targetBlog = match
    ? blog.find(data => data.id === (match.params.id))
    : null



  return (
    <div>
      <Router>
        <TableContainer component={Card}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
            </TableHead>
            <TableBody>
              {blog.map(x =>
                <TableRow key={x.id}>
                  <TableCell component="th" scope="row">
                    <Link to={`/blogs/${x.id}`}>{x.title}</Link>
                  </TableCell>
                  <TableCell align="right">{showDelete()}</TableCell>
                  <TableCell align="right"><Button onClick={likeBlog}>Like</Button></TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </TableContainer>

        <Switch>
          <Route path="/blogs/:id">
            <SingleBlog blog={targetBlog}/>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}
export default Blog
