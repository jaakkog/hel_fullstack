import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getData } from '../reducers/userReducer'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useRouteMatch
} from 'react-router-dom'
import SingleUser from './SingleUser'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    marginTop: 40,
  },
})


const Users = () => {

  const classes = useStyles()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getData())
  }, [dispatch])

  const users = useSelector(state => state.user)

  const match = useRouteMatch('/users/:id')

  const data = users.flatMap(x => x)

  const targetUser = match
    ? data.find(data => data.id === (match.params.id))
    : null


  return (
    <div>
      <Router>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Blogs created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((x) => x.map(data =>
                <TableRow key={data.id}>
                  <TableCell component="th" scope="row">
                    <Link to={`/users/${data.id}`}>{data.name}</Link>
                  </TableCell>
                  <TableCell>{data.blogs.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Switch>
          <Route path="/users/:id">
            <SingleUser user={targetUser} />
          </Route>
          <Route path="/">
          </Route>
        </Switch>
      </Router>
    </div>
  )}

export default Users