import React from 'react'

import Post from './Post'
import Posts from './Posts'
import Register from './Register'

import { useCacheUser } from '../auth0-utils'

const App = () => {
  useCacheUser()
  return (
    <div>
      <h1>Food Funeral</h1>

      <header className={'pt-2 pb-5'}>
        <h1 className={'text-6xl text-center'}>Food Funeral</h1>
        <h3 className={'text-3xl text-center'}>
          Food Blogging with a conscience.
        </h3>
      </header>
      <main>
        <Posts />
        <Post />
      </main>
    </div>
  )
}

export default App
