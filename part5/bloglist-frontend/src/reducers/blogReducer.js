import blogService from '../services/blogs'

const blogReducer = (state=[], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    console.log('action data', action.data)
    return [...action.data]
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'LIKED_BLOG':
    console.log('liketyksen action data', action.data)
    return [...state, action.data]
  case 'DELETE_BLOG':
    return [...state, action.data]
  default:
    return state
  }
}

export const initialBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    console.log('reducerin blogit', blogs)
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs.flatMap(x => x)
    })
  }

}

export const newBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const updateBlog = (content) => {
  const data = content
  const id = content.id
  return async dispatch => {
    const likedBlog = await blogService.update(id, data)
    dispatch({
      type: 'LIKE_BLOG',
      data: likedBlog
    })
  }
}

export const eraseBlog = (content) => {
  console.log('deleten contentti', content)
  return async dispatch => {
    const erasedBlogId = await blogService.erase(content)
    dispatch({
      type: 'DELETE_BLOG',
      data: erasedBlogId
    })
  }
}

export default blogReducer