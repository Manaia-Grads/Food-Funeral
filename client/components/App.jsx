import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Post from './Post'
import Posts from './Posts'
import AddPost from './AddPost'
import Navbar from './Navbar'

const App = () => {
  return (
    <div>
      <header className={'pt-2 pb-5'}>
        <Navbar />
        <h1 className={'text-6xl text-center'}>Food Funeral</h1>
        <h3 className={'text-3xl text-center'}>
          <i>A food blog with feeling</i>
        </h3>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/create-post" element={<AddPost />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
