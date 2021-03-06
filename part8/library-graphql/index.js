const { ApolloServer, UserInputError, gql } = require('apollo-server')
require('dotenv').config()
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

mongoose.set('useFindAndModify', false)

const pass = process.env.PASS

const MONGODB_URI = 'mongodb+srv://jaakko:mandre89@cluster0-hggf0.mongodb.net/test?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

  const { PubSub } = require('apollo-server')
  const pubsub = new PubSub()


const typeDefs = gql`
  type User {
    username: String!
    favouriteGenre: String
    id: ID!
  }
  type Token {
    value: String!
  }
  type Author {
    name: String!
    id: ID
    born: String
    bookCount: Int
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks: [Book]!
    allAuthors: [Author!]!
    me: User
    allGenres: [String]
  }
  type Subscription {
    addBook: Book!
  }
  type Mutation {
    addBook(
      title: String!
      published: Int
      author: String!
      genres: [String!]!
    ): Book
    createUser(
      username: String!
      favouriteGenre: String
    ): User
    editAuthor(
      name: String!
      setBornTo: Int
    ): Author
    login(
      username: String!
      password: String!
    ): Token
  }
`

const JWT_SECRET = 'secret'

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root,args) => {
      return Book.find({}).populate('author')
    },
    allAuthors: async (root, args) => {
      return Author.find({}).populate('books')
    },
    me: (root, args, context) => {
      console.log('context', context)
        return context.currentUser
      },
  },
  Author: {
    bookCount: async (author) => {
        let count = 0
        if(author.books)
          count = author.books.length
        return count
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {

      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("you shall not pass!")
      }

      let author = await Author.findOne({name: args.author})

      const auth = {
        name: args.author
      }

      const newAuthorToDb = new Author({...auth})

      if(!author) {
      const auth = {
        name: args.author
      }

      const newAuthorToDb = new Author({...auth})

      try {
        author = await newAuthorToDb.save()

      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    }

      const book = new Book({ ...args, author: author, genres: args.genres })
   
      try {
          const bookToDB = await book.save()
          console.log('book tallennuksen jälkeen', bookToDB)
          author.books = author.books.concat(bookToDB._id)
          console.log('authori', author)
          await  author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }

        pubsub.publish('BOOK_ADDED', { addBook: book })


        return book
        
    },
    editAuthor: async (root, args, context) => {

      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("no access")
      }
        const person = await Author.findOne({name: args.name})
        console.log('muutoksen args', args)
      if (!person) {
        return null
      }
      person.born = args.setBornTo

      console.log('päivitetty', person)
      try {
        await person.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
    }
    return person
  },

  createUser: async (root, args) => {
    const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

    try {
      return user.save()
    }
    catch (error) {
      throw new UserInputError(error.message, {
        invalidArgs: args,
      })
    }
  },

  login: async (root, args) => {
    const user = await User.findOne({ username: args.username })

    if ( !user || args.password !== 'secret' ) {
      throw new UserInputError("wrong credentials")
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    return { value: jwt.sign(userForToken, JWT_SECRET) }
  },

},
Subscription: {
  addBook: {
    subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
  },
},
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})