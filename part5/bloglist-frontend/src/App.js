/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification } from './reducers/notificationReducer'
import { initialBlogs, newBlog, updateBlog, eraseBlog } from './reducers/blogReducer'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import CancelIcon from '@material-ui/icons/Cancel'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'
import Users from './components/Users'
import { Link as RouterLink } from 'react-router-dom'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialBlogs())
  }, [dispatch])


  const blog = useSelector(data => data.blog)


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const addBlog = async (event) => {
    dispatch(newBlog(event))
    console.log('lisäyksen eventti', event)
    dispatch(createNotification(`Adding blog ${event.title} by ${event.author}`))
  }

  const blogForm = () => {
    const hideWhenVisible = { display: loginVisible ? '' : 'none' }
    const showWhenVisible = { display: loginVisible ? 'none' : '' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(false)}>New blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            createBlog={addBlog}
            setVisibility={() => setLoginVisible(false)}
          />
          <Button variant="contained" startIcon={<CancelIcon />} onClick={() => setLoginVisible(false)}>cancel</Button>
        </div>
      </div>
    )
  }


  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={showWhenVisible}>
          <Button variant="contained" color="primary" onClick={() => setLoginVisible(false)}>log in</Button>
        </div>
        <div style={hideWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            setUsername={({ target }) => setUsername(target.value)}
            setPassword={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />
          <Button variant="contained" color="secondary" onClick={() => setLoginVisible(true)}>cancel</Button>
        </div>
      </div>
    )
  }

  const logOut = (event) => {
    event.preventDefault()
    console.log('uloskirjautuminen ok!')
    window.localStorage.removeItem('loggedBlogappUser')
    window.localStorage.clear()
    window.location = '/'
  }

  const logOutClick = (event) => {
    logOut(event)
    dispatch(createNotification((`Logging out ${user.name}`)))
  }

  const likeBlog = (event) => {
    dispatch(updateBlog(event))
    window.location = '/blogs'
  }

  const deleteBlog = (event) => {
    console.log('deleten eventti', event)
    dispatch(eraseBlog(event))
    dispatch(createNotification('deleting blog'), blog)
    window.location = '/blogs'
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} />
        {loginForm()}
      </div>
    )
  }

  const padding = {
    padding: 5
  }

  const LinkBehavior = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} to="/" {...props} />
  ))

  console.log('apin blogit', blog.flatMap(x => x))

  return (
    <Container>
      <Router>
        <div>
          <AppBar position="static">
            <Tabs>
              <h2>BlogApp</h2>
              <Tab style={padding} label='home' component={RouterLink} to="/" ></Tab>
              <Tab style={padding} label='blogs' component={LinkBehavior} to="/blogs" />
              <Tab style={padding} label='users' component={RouterLink} to="/users" />
              <p>{user.name} logged in</p>
              <Button color="secondary" startIcon={<ExitToAppIcon />} onClick={logOutClick}>Log Out</Button>
            </Tabs>
          </AppBar>
        </div>
        <Switch>
          <Route path="/blogs">
            <div>
              <span>
                {<Blog blog={blog} updateBlog={likeBlog} eraseBlog={deleteBlog} user={user} />}
                {blogForm()}
              </span>
            </div>
          </Route>
          <Route path="/users">
            <span id='users'>
              <Users />
            </span>
          </Route>
          <Route path="/">
            <h1>Welcome to amazing Blog App</h1>
            <p>Use navigation to browse blogs and users</p>
          </Route>
        </Switch>
      </Router>
    </Container>
  )
}

export default App