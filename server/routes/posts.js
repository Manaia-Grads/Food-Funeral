const express = require('express')

const checkJwt = require('../auth0.js')
const db = require('../db/index')

const router = express.Router()
const getAuthDetails = require('./authUsers')

router.get('/:id', (req, res) => {
  const { id } = req.params
  db.getPostById(id)
    .then((response) => res.json(response))
    .catch((err) => res.status(500).send(err.message))
})

router.get('/', (req, res) => {
  db.getAllPosts()
    .then((posts) => {
      // console.log(posts)
      //for each post in res.body
      posts.map((post) => {
        console.log(post.auth0_id)
        getAuthDetails(post.auth0_id)
          .then((result) => console.log(result))
          .catch((err) => {
            console.error(err)
            res.status(500).json({ message: 'Something went wrong' })
          })
      })

      // arrayBlogs.map((blog) => {

      //   blog.auth0_id
      //send quesry to get the authID and query auth0 for details

      //get the authID and query auth0 for details

      //attach it to the res.body

      res.json(posts)
      return null
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

router.post('/', checkJwt, (req, res) => {
  const auth0_id = req.auth?.sub

  if (!auth0_id) {
    res.status(401).send('Unauthorized')
    return
  }
  const newPostData = {
    ...req.body,
    auth0_id,
  }

  db.addPost(newPostData)
    .then((ids) => {
      return db.getPostById(ids[0])
    })
    .then((post) => {
      res.json(post)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = router
