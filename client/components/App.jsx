import React from 'react'
import Posts from './Posts'

const App = () => {
  return (
    <div>
      <header className={'pt-2 pb-5'}>
        <h1 className={'text-6xl text-center'}>Food Funeral</h1>
        <h3 className={'text-3xl text-center'}>
          Food Blogging with a conscience.
        </h3>
      </header>
      <main>
        <Posts />
        {/* getPostById(2).then((reply) => {console.log(reply)}) */}
      </main>
    </div>
  )
}

export default App
