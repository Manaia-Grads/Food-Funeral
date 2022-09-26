import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addPost } from '../apis/posts'

function AddPost() {
  const navigate = useNavigate()

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
    addPost(form)
      .then((post) => {
        navigate(`/posts/${post.id}`)
      })
      .catch((err) => console.error(err.message))
  }

  return (
    <>
      <div>
        <h2 className="text-3xl text-center">Write a Post</h2>
        <p className="text-xl text-center">Posting Guidelines:</p>
        <p className="text-center ">
          When blogging about your meal, it&apos;s suggested to give a specific
          food item a eulogy-like send off. Respect your food by giving it a
          memorable send off.
        </p>
      </div>
      <form className="content-center" onSubmit={handleSubmit}>
        <input type="hidden" id="auth0_id" name="auth0_id" value="Guest" />

        <br />

        <label htmlFor="title">Post Title</label>
        <input
          className="border"
          onChange={handleChange}
          name="title"
          id="title"
          type="text"
        />

        <br />

        <label htmlFor="date">Time of Death</label>
        <input
          className="border"
          onChange={handleChange}
          name="date"
          id="date"
          type="date"
        />

        <br />

        <label htmlFor="content">Your blog</label>
        <textarea
          className="border"
          onChange={handleChange}
          name="content"
          id="content"
        />

        <br />

        <input
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        />
      </form>
    </>
  )
}

export default AddPost
