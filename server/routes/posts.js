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
      console.log(posts)
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

//  const date = new Date(Number(data.created) * 1000)
// date: {date.toDateString()}

module.exports = router

// import express from 'express'

// import { checkJwt } from '../auth0.js'
// const router = express.Router()
// import * as db from '../db/functions/comments.db.js'

// router.post('/', checkJwt, (req, res) => {
//   const authorId = req.user?.sub

//   if (!authorId) {
//     res.status(401).send('Unauthorized')
//     return
//   }
//   const newCommentData = {
//     ...req.body,
//     authorId,
//   }
//   db.addComment(newCommentData)
//     .then(() => {
//       res.sendStatus(201)
//     })
//     .catch((err) => {
//       console.log(err)
//       res.status(500).json({ message: 'Error' })
//     })
// })

// export default router
