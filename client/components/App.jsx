import React from 'react'
import Posts from './Posts'

const App = () => {
  return (
    <div>
      <h1>Food Funeral</h1>
      <h3>Food Blogging with a conscience.</h3>

      <Posts />
      {/* getPostById(2).then((reply) => {console.log(reply)}) */}
    </div>
  )
}

export default App
