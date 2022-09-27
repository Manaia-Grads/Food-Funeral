const express = require('express')

const checkJwt = require('../auth0.js')
const db = require('../db/index')

const { multerUpload } = require('../../middleware/multer')
const router = express.Router()

router.get('/:id', (req, res) => {
  const { id } = req.params
  db.getPostById(id)
    .then((response) => res.json(response))
    .catch((err) => res.status(500).send(err.message))
})

router.delete('/:id', (req, res) => {
  db.deletePostById(req.params.id)
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log(err)
      res.status(500).send({ message: 'Something went wrong' })
    })
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

router.post('/', checkJwt, multerUpload.single('file'), (req, res) => {
  const post = req.body

  if (!post.auth0_id) {
    res.status(401).send('Unauthorized')
    return
  }

  post.image = req.file.path.substring(29)

  db.addPost(post)
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

router.patch('/:id', multerUpload.single('file'), (req, res) => {
  console.log(req.body)
  const post = req.body

  post.image = req.file.path.substring(29)

  db.updatePost(post, req.params.id)
    .then((ids) => {
      console.log(ids)
      return db.getPostById(ids)
    })
    .then((post) => {
      res.json(post)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = router
