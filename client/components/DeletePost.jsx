import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { deletePostDataById } from '../apis/posts'

export function DeletePost({ id, auth0_id }) {
  const navigate = useNavigate()

  const { user } = useAuth0()

  const handleDelete = (e) => {
    e.preventDefault()
    deletePostDataById(id)
      .then(() => navigate('/'))
      .catch((err) => console.log(err.message))
  }

  return (
    <div className="flex justify-center">
      {auth0_id == user?.sub && (
        <button
          className="rounded-md font-fredoka-one border-custom-black border-2 bg-custom-blue hover:bg-custom-grey text-custom-black font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
          onClick={handleDelete}
        >
          Delete
        </button>
      )}
    </div>
  )
}
