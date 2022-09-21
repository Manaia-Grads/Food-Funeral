const express = require('express')

const db = require('../db/index')

const router = express.Router()

router.get('/', (req, res) => {
  db.getAllPosts()
    .then((posts) => {
      res.json(posts)
      return null
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({message:'Something went wrong'})
    })
})

module.exports = router
