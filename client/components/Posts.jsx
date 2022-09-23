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
              alt="different food type spinning"
            />
          </div>
        ) : (
          <div className={'flex'}>
            {data?.map((post) => (
              <Link key={post.id} to={`/posts/${post.id}`}>
                <div className={'flex-auto'}>
                  <h3 className={'text-3xl font-mono'}>{post.title}</h3>
                  <img
                    className={'w-3/4'}
                    src={'/images/' + post.img}
                    alt="unfortunately there is no alt text available right now"
                  />
                  <p className={'text-blue-400'}>By TBC - username</p>
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
