const express = require('express')

const db = require('../db/index')

const router = express.Router()

router.get('/:id/comments', (req, res) => {
  const { id: postId } = req.params
  db.getAllCommentsByPostId(postId)
    .then((comments) => {
      res.json(
        comments.map((comment) => {
          return {
            id: comment.id,
            content: comment.content,
            auth0Id: comment.auth0_id,
            postId: comment.post_id,
            date: comment.date_created,
          }
        })
      )
      return null
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

router.post('/:id/comments', (req, res) => {
  const comment = req.body
  const { id: postId } = req.params
  db.addComment(comment, postId)
    .then((ids) => {
      return db.getCommentById(ids[0])
    })
    .then((comment) => {
      res.json({
        id: comment.id,
        content: comment.content,
        auth0Id: comment.auth0_id,
        postId: comment.post_id,
        date: comment.date_created,
      })
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = router
