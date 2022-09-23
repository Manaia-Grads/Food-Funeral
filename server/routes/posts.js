const express = require('express')

const db = require('../db/index')

const router = express.Router()

router.get('/:id', (req, res) => {
  const { id } = req.params
  db.getPostById(id)
    .then((response) => res.json(response))
    .catch((err) => res.status(500).send(err.message))
})

router.get('/', (req, res) => {
  db.getAllPosts()
    .then((posts) => {
      res.json(posts)
      return null
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

router.post('/', (req, res) => {
  const post = req.body
  db.addPost(post)
    .then((ids) => {
      return db.getPostById(ids[0])
    })
    .then((post) => {
      //returns two console logs - fix later
      res.json(post) // is it because of two thens? One gets by id and the other returns the json? yep sure
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = router