import React from 'react'
import PropTypes from 'prop-types'

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
    <div id="username">
        username
      <input
        id="user"
        type="text"
        value={username}
        name="Username"
        onChange={setUsername}
      />
    </div>
    <div id="password">
        password
      <input
        id="pass"
        type="password"
        value={password}
        name="Password"
        onChange={setPassword}
      />
    </div>
    <button id="login-button" type="submit">login</button>
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