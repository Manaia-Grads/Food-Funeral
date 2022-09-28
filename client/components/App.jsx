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
