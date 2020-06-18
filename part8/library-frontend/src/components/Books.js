import React from 'react'
import { useSubscription, useApolloClient } from '@apollo/client'
import { BOOK_ADDED, ALL_BOOKS } from '../queries'

const Books = ( { show, books } ) => {

  const client = useApolloClient()

  console.log('books', books)
  const book = books.allBooks
  console.log('books data', book)

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.addBook
      console.log('subscription', subscriptionData)
      window.alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {book.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books