import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { deletePostDataById } from '../apis/posts'

export default function DeletePost({ id, auth0_id }) {
  const navigate = useNavigate()

  const { user } = useAuth0()

  const handleDelete = (e) => {
    e.preventDefault()
    deletePostDataById(id)
      .then(() => navigate('/'))
      .catch((err) => console.log(err.message))
  }

  return (
    <>
      {auth0_id == user?.sub && (
        <button
          className="block rounded py-2 pr-4 pl-3 text-gray-700 hover:bg-green-700 hover:text-white  md:border-2 md:border-red-900 md:bg-red-900 md:p-2 md:text-white md:hover:text-white"
          onClick={handleDelete}
        >
          {' '}
          Delete
        </button>
      )}
    </>
  )
}
