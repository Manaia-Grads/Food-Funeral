import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getPost } from '../actions/post.js'

export default function Post() {
  const dispatch = useDispatch()
  const { data: post, loading, error } = useSelector((state) => state.post)
  const { id } = useParams()
  console.log(id)

  useEffect(() => {
    dispatch(getPost(id))
  }, [])

  return loading ? (
    'loading'
  ) : error ? (
    'No post here'
  ) : (
    <>
      <div>
        <h1>{post?.title}</h1>
        <div>
          <img src={'/images/' + post?.img} alt={post?.title} />
        </div>
        <div>
          <p>{post?.date_eaten}</p>
          <p>Posted By: {post?.auth0_id}</p>
        </div>
        <div>{post?.content}</div>
      </div>
    </>
  )
}
