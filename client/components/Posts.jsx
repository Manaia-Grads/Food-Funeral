import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { fetchPosts } from '../actions/posts'

function Posts() {
  const dispatch = useDispatch()
  useEffect(() => dispatch(fetchPosts()),[])

  const {data, loading, error } = useSelector(state => state.posts)
  console.log('component', data, 'loading', loading)

  return (
    <>    
    <div>
      {!error && loading? (<div> loading...</div>) :(  
      <>
      {data?.map(post => (
        <div key={post.id}> 
          <h3>{post.title}</h3>
          <img src={post.img} alt='unfortunately there is no alt text available right now'/>
          <p>By TBC - username</p>
        </div>
        )
      )}
     </>
     )}
    
    </div>
    </>
  )
}

export default Posts