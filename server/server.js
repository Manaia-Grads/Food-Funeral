const express = require('express')
const path = require('path')

const postsRoute = require('./routes/posts')
const usersRoutes = require('./routes/users')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/posts', postsRoute)
server.use('/api/v1/users', usersRoutes)

server.get('*', (req, res) => {
  res.sendFile(path.resolve('server/public/index.html'))
})

server.get('*', (req, res) => {
  res.sendFile(path.resolve('server/public/index.html'))
})

module.exports = server
