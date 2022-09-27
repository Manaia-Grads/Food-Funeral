import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPost } from '../actions/post.js'
import { UpdatePost } from './UpdatePost.jsx'
import DeletePost from './DeletePost.jsx'
import AddComment from './AddComment.jsx'
import Comments from './Comments.jsx'
import { useAuth0 } from '@auth0/auth0-react'

export default function Post() {
  const dispatch = useDispatch()
  const { data: post, loading, error } = useSelector((state) => state.post)
  const { id } = useParams()
  const { user } = useAuth0()

  const [update, setUpdate] = useState({ updateStatus: false })

  useEffect(() => {
    dispatch(getPost(id))
  }, [])

  function updateClickHandler() {
    setUpdate({ updateStatus: true })
  }

  return loading ? (
    'loading'
  ) : error ? (
    'No post here'
  ) : (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1>{post?.title}</h1>
        <div>
          <img
            className="max-w-sm"
            src={'/images/uploads/' + post?.img}
            alt={post?.title}
          />
        </div>
        <div>
          <p>{post?.date_eaten}</p>
          <p>Posted By: {post?.name}</p>
        </div>
        <div>{post?.content}</div>

        {post.auth0_id == user?.sub && (
          <button
            onClick={updateClickHandler}
            className="block rounded py-2 pr-4 pl-3 text-gray-700 hover:bg-green-700 hover:text-white  md:border-2 md:border-purple-900 md:bg-purple-900 md:p-2 md:text-white md:hover:text-white"
          >
            Edit Post
          </button>
        )}
        {update.updateStatus && <UpdatePost postData={post} id={id} />}

        <DeletePost id={id} auth0_id={post.auth0_id} />

        <div>
          <Comments />
          <AddComment />
        </div>
      </div>
    </>
  )
}
