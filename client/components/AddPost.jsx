import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { addPost } from '../apis/posts'
import { addNewPost } from '../actions/addPost'

function AddPost() {
  const dispatch = useDispatch()
  const initialData = {
    title: '',
    date: '',
    content: '',
  }
  const [form, setForm] = useState(initialData)

  const handleChange = (evt) => {
    setForm({
      ...form,
      [evt.target.name]: evt.target.value,
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setForm(form)
    dispatch(addNewPost(form))
    setForm(initialData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Write a Post</h2>
      <p>Posting Guidelines:</p>
      <p>
        When blogging about your meal, it&apos;s suggested to give a specific
        food item a eulogy-like send off
      </p>

      <label htmlFor="title">Post Title</label>
      <input onChange={handleChange} name="title" id="title" type="text" />

      <label htmlFor="date">Time of Death</label>
      <input onChange={handleChange} name="date" id="date" type="date" />

      <label htmlFor="content">Your blog</label>
      <input
        onChange={handleChange}
        name="content"
        id="content"
        type="textarea"
      />

      <input type="submit" />
    </form>
  )
}

export default AddPost
