import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchPosts } from '../actions/posts'

function Posts() {
  const dispatch = useDispatch()
  useEffect(() => dispatch(fetchPosts()), [])

  const { data, loading, error } = useSelector((state) => state.posts)

  return (
    <>
      <div>
        {!error && loading ? (
          <div className={'text-l text-center'}>
            <img
              className={'place-self-center'}
              src={'/images/loading.gif'}
              alt="different food types spinning"
            />
          </div>
        ) : (
          <div className="inline-grid grid-cols-3 grid-rows-1 gap-5">
            {data?.map((post) => (
              <Link key={post.id} to={`/posts/${post.id}`}>
                <div className="w-3/4 min-h-fit flex-auto border-4 border-black rounded-t-full bg-custom-grey">
                  <h3 className="mt-20 pt-8 text-3xl font-mono text-center">
                    {post.title}
                  </h3>
                  <img
                    className="p-12 justify-center"
                    src={'/images/uploads/' + post.img}
                    alt="unfortunately there is no alt text available right now"
                  />
                  <p className="text-center mb-2">By {post.name}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Posts
