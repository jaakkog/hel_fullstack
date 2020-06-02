import userService from '../services/users'

const userReducer = (state=[], action) => {
  console.log('userin action', action)
  switch(action.type) {
  case 'GET_USERS':
    return [action.data]
  default:
    return state
  }
}

export const getData = () => {
  return async dispatch => {
    const users = await userService.getUsers()
    console.log('getusers toimii')
    dispatch({
      type: 'GET_USERS',
      data: users
    })
  }
}

export default userReducer