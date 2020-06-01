import React from 'react'
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'


const Notification = ({ message }) => {


  if (message === null) {
    return null
  }

  return (
    <div>
      <Alert severity="error" >
        <AlertTitle>{message}</AlertTitle>
        {message}
      </Alert>
    </div>
  )
}

export default Notification