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
      <header className={'pt-2 pb-5'}>
        <h1 className={'text-6xl text-center'}>Food Funeral</h1>
        <h3 className={'text-3xl text-center'}>
          <i>A food blog with feeling</i>
        </h3>
      </header>
      <div>
        {!error && loading ? (
          <div className={'text-l text-center'}>
            <img
              className={'place-self-center'}
              src={'/images/loading.gif'}
              alt="different food type spinning"
            />
          </div>
        ) : (
          <div className="inline-grid grid-cols-3 grid-rows-1 gap-2">
            {data?.map((post) => (
              <Link key={post.id} to={`/posts/${post.id}`}>
                <div className={'flex-auto'}>
                  <h3 className={'text-3xl font-mono'}>{post.title}</h3>
                  <img
                    className={'w-3/4'}
                    src={'/images/uploads/' + post.img}
                    alt="unfortunately there is no alt text available right now"
                  />
                  <p className={'text-blue-400'}>Posted By: {post.name}</p>
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
