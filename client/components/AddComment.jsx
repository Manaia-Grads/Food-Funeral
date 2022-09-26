import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewComment } from '../actions/comments'
import { useParams } from 'react-router-dom'

function AddComment() {
  const dispatch = useDispatch()
  const { id } = useParams()

  const initialData = {
    content: '',
    postId: '',
    auth0Id: 'Guest',
  }
  const [form, setForm] = useState(initialData)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setForm(initialData)
    dispatch(addNewComment(form, id))
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="hidden" id="postId" name="postId" />
        <label htmlFor="content">Add a comment</label>
        <textarea
          onChange={handleChange}
          id="content"
          name="content"
          value={form.content}
        />
        <input type="submit" />
      </form>
    </>
  )
}

export default AddComment
