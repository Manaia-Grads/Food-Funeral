import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updatePost } from '../apis/posts'

export function UpdatePost({ postData }) {
  const { getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()

  const { user, logout, loginWithRedirect, isLoading, isAuthenticated } =
    useAuth0()
  console.log(postData)
  const initialData = {
    title: postData.title,
    date: postData.date_eaten,
    content: postData.content,
    auth0_id: user?.sub || '',
    name: user?.name || '',
  }
  const [form, setForm] = useState(initialData)

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
    formData.append('auth0_id', form.auth0_id)
    formData.append('name', form.name)

    getAccessTokenSilently()
      .then((token) => {
        return updatePost(formData, token)
      })
      .then((newPostData) => {
        setForm(initialData)
        navigate(`/posts/${newPostData.id}`)
      })
      .catch((err) => console.error(err.message))
  }

  return (
    <>
      <form
        className="content-center"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <input type="hidden" id="auth0_id" name="auth0_id" value={user?.sub} />
        <input type="hidden" id="name" name="name" value={user?.name} />

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

        <label htmlFor="file">Upload Image</label>
        <input onChange={handleChange} name="file" id="file" type="file" />

        <br />

        <input
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        />
      </form>
    </>
  )
}

export default withAuthenticationRequired(UpdatePost)
