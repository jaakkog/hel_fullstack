const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'blog1',
    author: 'author1',
    url: 'url1.com',
    likes: 3,
    id: '123oiu12',
  },
  {
    title: 'blog2',
    author: 'author2',
    url: 'url2.com',
    likes: 34,
    id: '234jihkj234',
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ author: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog.id.toString()
}

const blogsInDb = async () => {
  const notes = await Blog.find({})
  return notes.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb,
}
