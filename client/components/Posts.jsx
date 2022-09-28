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
      <div className="w-full h-fit border-4 border-black bg-custom-yellow p-2 mb-5">
        <h1 className="font-fredoka-one text-center text-6xl">Food Funeral</h1>
        <h2 className="font-fredoka-one text-center text-2xl">
          A food blog with feeling
        </h2>
      </div>

      <div className="w-full h-fit border-4 border-black bg-custom-pink px-5 py-10 mb-5">
        {!error && loading ? (
          <div className={'text-l text-center'}>
            <img
              className={'place-self-center'}
              src={'/images/loading.gif'}
              alt="different food types spinning"
            />
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-10">
            {data?.map((post) => (
              <Link key={post.id} to={`/posts/${post.id}`}>
                <div className="w-full min-h-fit flex-auto border-4 border-black rounded-t-full bg-custom-grey hover:border-r-8 hover:border-b-8">
                  <h3 className="mt-20 pt-4 text-3xl font-graduate uppercase text-center">
                    {post.title}
                  </h3>
                  <img
                    className="p-12 justify-center"
                    src={'/images/uploads/' + post.img}
                    alt="unfortunately there is no alt text available right now"
                  />
                  <p className="text-center font-graduate uppercase mb-2">
                    By {post.name}
                  </p>
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
