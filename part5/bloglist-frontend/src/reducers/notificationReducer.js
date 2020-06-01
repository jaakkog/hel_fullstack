const notificationReducer = (state=[], action) => {
  console.log(action)
  switch (action.type) {
  case 'NOTIFICATION':
    console.log('dataa', action.data)
    return alert(action.data.content)
  default:
    return state
  }
}

export const createNotification = (content) => {
  return {
    type: 'NOTIFICATION',
    data: {
      content
    }
  }
}

export default notificationReducer

