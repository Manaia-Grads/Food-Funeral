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
    auth0_id: 'Guest',
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
      <h2>Write a Post (Guest User)</h2>
      <p>Posting Guidelines:</p>
      <p>
        When blogging about your meal, it&apos;s suggested to give a specific
        food item a eulogy-like send off
      </p>

      <input type="hidden" id="auth0_id" name="auth0_id" value="Guest" />

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

      <input //Grant: used css from tailwind https://v1.tailwindcss.com/components/forms
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      />
    </form>
  )
}

export default AddPost
