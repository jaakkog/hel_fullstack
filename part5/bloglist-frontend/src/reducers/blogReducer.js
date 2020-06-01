import blogService from '../services/blogs'

const blogReducer = (state=[], action) => {
  console.log('ACTION', action)
  switch (action.type) {
  case 'INIT_BLOGS':
    console.log('action data', action.data)
    return action.data
  default:
    return state
  }
}

export const initialBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }

}

export default blogReducer