
import React, { useState } from 'react'
import Authors from './components/Authors'
import { useQuery, useMutation } from '@apollo/client'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS } from './queries'
import { ALL_BOOKS } from './queries'


const App = () => {
  const [page, setPage] = useState('authors')

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  console.log('books', books)
  console.log('authors', authors)

/*
  if (books.loading)  {
    return <div>loading...</div>
  }
  */
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
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