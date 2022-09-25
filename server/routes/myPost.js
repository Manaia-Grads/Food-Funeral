import express from 'express'

import { checkJwt } from '../auth0.js'
import * as db from '../db/functions/my-pets.db.js'

const router = express.Router()

router.get('/', checkJwt, (req, res) => {
  const ownerId = req.user?.sub

  if (!ownerId) {
    res.status(401).send('Unauthorized')
    return
  }

  db.getMyPets(ownerId)
    .then((pets) => {
      res.json(pets)
    })
    .catch((err) => {
      console.log(err.message)
      res.status(500).send('Something went wrong')
    })
})

router.post('/', checkJwt, (req, res) => {
  const auth0_id = req.user?.sub
  const date_created = ''
  const { title, date_eaten, content, img } = req.body

  db.addPost({ title, date_eaten, content, img, auth0_id, date_created })
    .then((ids) => {
      return db.getPostById(ids[0])
    })
    .then(() => {
      res.sendStatus(201)
    })
    .catch((err) => {
      console.log(err.message)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

export default router
