const express = require('express')

const db = require('../db/index')

const { multerUpload } = require('../../middleware/multer')
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

router.post('/', multerUpload.single('file'), (req, res) => {
  const post = req.body
  post.image = req.file.path.substring(29)
  console.log(post)

  db.addPost(post)
    .then((ids) => {
      return db.getPostById(ids[0])
    })
    .then((post) => {
      res.json(post)
    })
    .catch(() => {
      res.status(500).send('route error')
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = router
