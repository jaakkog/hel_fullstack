const notificationReducer = (state=[], action) => {
  console.log(action)
  switch (action.type) {
  case 'NOTIFICATION':
    console.log('dataa', action.data)
    alert(action.data)
    return [...state, action.data]
  default:
    return state
  }
}

export const createNotification = (content) => {
  return {
    type: 'NOTIFICATION',
    data: content
  }
}

export default notificationReducer

