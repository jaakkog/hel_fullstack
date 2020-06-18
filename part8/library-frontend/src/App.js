
import React, { useState } from 'react'
import Authors from './components/Authors'
import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/client'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)

  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log('tilausdata', subscriptionData)
    }
  })


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