import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPost } from '../actions/post.js'
import { UpdatePost } from './UpdatePost.jsx'
// import { DeletePost } from './DeletePost.jsx'
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
    <div className="px-5">
      <div className="flex flex-col items-center justify-center w-full bg-custom-yellow border-4 border-custom-black mb-5">
        <h1 className="text-6xl font-fredoka-one my-2">{post?.title}</h1>
        <div className="w-2/5">
          <img src={'/images/uploads/' + post?.img} alt={post?.title} />
          <p className="text-md font-fredoka-one">
            Posted by [ {post?.name} ] on {post?.date_eaten}
          </p>

          <p className="text-xl font-fredoka-one my-6">{post?.content}</p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center w-full bg-custom-blue border-4 border-custom-black mb-5">
        <UpdatePost postData={post} id={id} />
      </div>
      <div
        className="flex flex-col items-center justify-center w-full bg-custom-pink border-4 border-custom-black mb-5
        "
      >
        <h1 className="text-3xl font-fredoka-one my-2">Comments</h1>
        <AddComment />
        <Comments />
      </div>
    </div>
  )
}
