const express = require('express')
const path = require('path')
const request = require('superagent')
const postsRoute = require('./routes/posts')

const server = express()

require('dotenv').config()
const token = process.env.AUTH_TOKEN

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/posts', postsRoute)

server.get('/api/v2/users/:id', (req, res) => {
  const { id } = req.params
  return request
    .get(`https://food-funeral.au.auth0.com/api/v2/users/${id}`)
    .set('Authorization', 'Bearer ' + token)
    .then((response) => {
      res.json(response.body)
      return null
    })
})

server.get('*', (req, res) => {
  res.sendFile(path.resolve('server/public/index.html'))
})
module.exports = server
