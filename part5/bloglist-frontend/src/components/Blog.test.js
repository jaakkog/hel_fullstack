import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders blog title and author', () => {
  const blog = {
    title: 'This is awesome test blog',
    author: 'Made by fantastic author',
    url: '',
    likes: '',
    user: '',

  }

  const user = {
    username: '',
    name: '',
  }

  const component = render(
    <Blog blog={blog} user={user}/>
  )

  component.debug()

  const div = component.container.querySelector('.blogInfo')
  expect(div).toHaveTextContent(
    'This is awesome test blog',
    'Made by fantastic author'
  )
})

test('clicking the button show full blog info', async () => {
  const blog = {
    title: 'This is awesome test blog',
    author: 'Made by fantastic author',
    url: 'hs.fi',
    likes: '3',
    user: '',

  }

  const user = {
    username: '',
    name: '',
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} toggleVisibility={mockHandler}/>
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const div = component.container.querySelector('.blogInfo')
  expect(div).toHaveTextContent(
    'This is awesome test blog',
    'Made by fantastic author',
    'hs.fi',
    '3'
  )
})

test('clicking the like button calls event handler twice', async () => {
  const blog = {
    title: 'This is awesome test blog',
    author: 'Made by fantastic author',
    url: 'hs.fi',
    likes: '3',
    user: '',

  }

  const user = {
    username: '',
    name: '',
  }


  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} updateBlog={mockHandler} />
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  console.log('mock', mockHandler.mock.calls.length)

  expect(mockHandler.mock.calls).toHaveLength(2)
})