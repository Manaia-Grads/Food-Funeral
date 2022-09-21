const express = require('express')
const path = require('path')

const postsRoute = require('./routes/posts')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))


server.use('/api/v1/posts', postsRoute)

module.exports = server
