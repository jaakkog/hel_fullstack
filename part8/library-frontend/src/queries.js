import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      bookCount
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query {
      allBooks {
          title
          author {
            name
            born
          }
          published
          genres
      }

  }
`

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $published: Int!, $author: String!,  $genres: [String!]!) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
      published
      author {
        name
        born
      }
      genres
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born)  {
      name
      born
      bookCount
      id
  }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const CREATE_USER = gql`
  mutation createUser($username: String!, $favouriteGenre: String) {
    createUser(username: $username, favouriteGenre: $favoriteGenre) {
      username
      favouriteGenre
    }
  }
`
