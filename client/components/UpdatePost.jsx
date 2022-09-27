import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updatePost } from '../apis/posts'
import { useAuth0 } from '@auth0/auth0-react'

export function UpdatePost({ postData, id }) {
  const navigate = useNavigate()
  const { user } = useAuth0()

  const initialData = {
    title: postData.title,
    date: postData.date_eaten,
    content: postData.content,
  }
  const [form, setForm] = useState(initialData)
  const [update, setUpdate] = useState({ updateStatus: false })

  const handleChange = (evt) => {
    if (evt.target.name === 'file') {
      setForm({ ...form, file: evt.target.files[0] })
    } else {
      evt.preventDefault()
      setForm({
        ...form,
        [evt.target.name]: evt.target.value,
      })
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()

    const formData = new FormData()
    formData.append('file', form.file)
    formData.append('title', form.title)
    formData.append('date', form.date)
    formData.append('content', form.content)

    updatePost(formData, id)
      .then(() => {
        navigate(`/`)
      })
      .catch((err) => console.error(err.message))
  }

  function updateClickHandler() {
    setUpdate({ updateStatus: true })
  }

  return (
    <>
      {postData.auth0_id == user?.sub && (
        <button
          onClick={updateClickHandler}
          className="block rounded py-2 pr-4 pl-3 text-gray-700 hover:bg-green-700 hover:text-white  md:border-2 md:border-purple-900 md:bg-purple-900 md:p-2 md:text-white md:hover:text-white"
        >
          Edit Post
        </button>
      )}
      {update.updateStatus && (
        <form
          className="content-center"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <br />

          <label htmlFor="title">Post Title</label>
          <input
            className="border"
            onChange={handleChange}
            name="title"
            id="title"
            type="text"
            value={form.title}
          />

          <br />

          <label htmlFor="date">Time of Death</label>
          <input
            className="border"
            onChange={handleChange}
            name="date"
            id="date"
            type="date"
            value={form.date}
          />

          <br />

          <label htmlFor="content">Your blog</label>
          <textarea
            className="border"
            onChange={handleChange}
            name="content"
            id="content"
            value={form.content}
          />

          <br />

          <label htmlFor="file">Upload Image</label>
          <input onChange={handleChange} name="file" id="file" type="file" />

          <br />

          <input
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          />
        </form>
      )}
    </>
  )
}
