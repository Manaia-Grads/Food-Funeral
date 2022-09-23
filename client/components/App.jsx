import React from 'react'
import Post from './Post'
import Posts from './Posts'
import AddPost from './AddPost'

const App = () => {
  return (
    <div>
      <h1>Food Funeral</h1>

      <header className={'pt-2 pb-5'}>
        <h1 className={'text-6xl text-center'}>Food Funeral</h1>
        <h3 className={'text-3xl text-center'}>
          <i>A food blog with feeling</i>
        </h3>
      </header>
      <main>
        <Posts />
        <Post />
        <AddPost />
      </main>
    </div>
  )
}

export default App
