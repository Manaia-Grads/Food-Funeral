import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getPost } from '../actions/post.js'

export default function Post() {
  const dispatch = useDispatch()
  const { data: post, loading, error } = useSelector((state) => state.post)

  useEffect(() => {
    dispatch(getPost(2))
  }, [])

  //console.log(`loading: ${loading} error: ${error} post: ${post?.title}`)

  return loading ? (
    'loading'
  ) : error ? (
    'No post here'
  ) : (
    <>
      <div>
        <h1>{post?.title}</h1>
        <div>
          <img src={post?.img} alt={post?.title} />
        </div>
        <div>
          <p>{post?.date_eaten}</p>
          <p>UserName (placeholder)</p>
          {/* username here <p>{post?.user_id}</p> */}
        </div>
        <div>{post?.content}</div>
      </div>
      {/*?? <Comments postId={id}/> */}
    </>
  )
}

// {
//   id: 1,
//   title: 'I ate a cow',
//   date_eaten: '2022-09-22',
//   content: 'this is a very long string that can be changed later',
//   img: 'www.googleimages.com/bears',
//   user_id: 1,
//   date_created: '2022-09-22',
// },
