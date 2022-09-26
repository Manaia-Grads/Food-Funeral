import { useAuth0} from '@auth0/auth0-react'
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
      {auth0_id == user?.sub && <button onClick={handleDelete}> Delete</button>}
    </>
  )
}


