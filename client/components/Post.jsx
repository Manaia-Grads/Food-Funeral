import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPost } from '../actions/post.js'
import DeletePost from './DeletePost.jsx'
import AddComment from './AddComment.jsx'
import Comments from './Comments.jsx'

export default function Post() {
  
  const dispatch = useDispatch()
  const { data: post, loading, error } = useSelector((state) => state.post)
  const { id } = useParams()

  useEffect(() => {
    dispatch(getPost(id))
  }, [])

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

        <DeletePost id={id} auth0_id={post.auth0_id} />

        <div>
          <Comments />
          <AddComment />
        </div>
      </div>
    </>
  )
}
