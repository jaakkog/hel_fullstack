import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const input= component.container.querySelector('input')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: {
      value: 'Blogi',
    }
  })
  fireEvent.change(author, {
    target: {
      value: 'Jaakko',
    }
  })
  fireEvent.change(url, {
    target: {
      value: 'yle.fi',
    }
  })
  fireEvent.submit(form)

  console.log('input', input)
  console.log('mock', createBlog.mock.calls[0][0])

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Blogi')
  expect(createBlog.mock.calls[0][0].author).toBe('Jaakko')
  expect(createBlog.mock.calls[0][0].url).toBe('yle.fi')
})