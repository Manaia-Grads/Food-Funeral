const express = require('express')
const path = require('path')

const postsRoute = require('./routes/posts')
//const myPostRoute = require('./routes/myPost')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/posts', postsRoute)
//server.use('/api/v1/posts/mypost', myPostRoute)

server.get('*', (req, res) => {
  res.sendFile(path.resolve('server/public/index.html'))
})

module.exports = server
