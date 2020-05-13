import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const LoginForm = ({
  handleLogin,
  username,
  password,
  setUsername,
  setPassword
}) => (
  <form
    id="form"
    onSubmit={handleLogin}>
    <TextField id="filled-basic" label="Username" variant="filled" id="user"
        type="text"
        value={username}
        name="Username"
        onChange={setUsername}>
        username
      <input/>
    </TextField>
    <div></div>
    <TextField id="filled-basic" label="Password" variant="filled"  id="pass"
        type="password"
        value={password}
        name="Password"
        onChange={setPassword}>
        password
      <input/>
    </TextField>
    <div></div>
    <Button variant="contained" color="primary" type="submit">login</Button>
  </form>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm