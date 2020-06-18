/* eslint-disable no-undef */
  
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'
import { ALL_AUTHORS } from '../queries'

const Authors = ( { show, authors } ) => {
  
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })
  
  const submit = async (event) => {
    event.preventDefault()
    console.log('working', name, born)
    editAuthor({  variables: { name, born } })

    setName('')
    setBorn('')
  }

  if (!show) {
    return null
  }



  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {console.log('frontin authorit', authors)}
          {authors.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
      <h3>Set birthyear</h3>
        <form onSubmit={submit} >
            <select value={name} onChange={({target}) => setName(target.value)} >
            {authors.allAuthors.map(a => 
            <option value={a.name} key={a.id}>{a.name}</option>
            )}
            {console.log('name', name)}
            </select>
              <div>
              Born
            <input
              type='number'
              value={born}
              onChange={({ target }) => setBorn(parseInt(target.value))} 
              />
              </div>
              <button type='submit'>update author</button>
        </form>
      </div>

    </div>
  )
}

export default Authors
