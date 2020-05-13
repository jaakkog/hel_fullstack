  
import React, { useState, useEffect } from 'react'

const Authors = ({ authors }) => {
  const [person, setPerson] = useState(null)
  console.log(authors)

  /*useEffect(() => {
    if (result.data) {
      setPerson(result.data.findPerson)
    }
  }, [result.data])
  
  */
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
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default Authors
