import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewComment } from '../actions/comments'
import { useParams } from 'react-router-dom'

import { useAuth0 } from '@auth0/auth0-react'

function AddComment() {
  const dispatch = useDispatch()
  const { id } = useParams()

  const { user } = useAuth0()

  const initialData = {
    content: '',
    postId: '',
    auth0_id: '',
    name: '',
  }

  const [form, setForm] = useState(initialData)

  const handleChange = (e) => {
    const auth0Id = user?.sub || 'Guest'
    const userName = user?.name || 'Anonymous Mourner'

    setForm({
      ...form,
      [e.target.name]: e.target.value,
      auth0_id: auth0Id,
      name: userName,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setForm(initialData)
    dispatch(addNewComment(form, id))
  }

  return (
    <>
      <form
        className="flex flex-wrap flex-row-reverse w-2/5"
        onSubmit={handleSubmit}
      >
        <input type="hidden" id="postId" name="postId" />

        <label htmlFor="content" className="my-1 font-fredoka-one">
          Add a comment
        </label>
        <textarea
          className="border-2 border-custom-black rounded-md w-full font-fredoka-one"
          onChange={handleChange}
          id="content"
          name="content"
          value={form.content}
        />
        <input
          className="align-right border-custom-black hover:bg-custom-blue block rounded border-2 bg-custom-white my-1 px-1 text-black font-fredoka-one"
          type="submit"
        />
      </form>
    </>
  )
}

export default AddComment
