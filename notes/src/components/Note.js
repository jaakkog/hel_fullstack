/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React from 'react'

const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    <li className="note">
      <span>{note.content}</span>
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note
