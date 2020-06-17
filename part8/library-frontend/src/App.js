
import React, { useState } from 'react'
import Authors from './components/Authors'
import { useQuery, useApolloClient } from '@apollo/client'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { ALL_AUTHORS } from './queries'
import { ALL_BOOKS } from './queries'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  console.log('books', books.data)
  console.log('authors', authors)

  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (books.loading)  {
    return <div>loading...</div>
  }

  if (!token) {
      return (
        <div>
        <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
      </div>
          <h2>Login</h2>
          <Login
            setToken={setToken}
          />
        </div>
      )
      }
  
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors
        show={page === 'authors'}
        authors={authors.data}
      />

      <Books
        show={page === 'books'}
        books={books.data}
      />

      <NewBook
        show={page === 'add'}
      />
    </div>
  )
}

export default App