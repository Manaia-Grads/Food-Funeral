// import 'dotenv/config'

// import { v2 as cloudinary } from 'cloudinary'
import express from 'express'

import { checkJwt } from '../auth0.js'
import * as db from '../db/functions/my-pets.db.js'

// const cloudName = 'rohan-aihe'
// const apiKey = '516514146324499'
// const apiSecret = process.env.SECRET_KEY

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



// router.post('/', checkJwt, (req, res) => {
//   const ownerId = req.user?.sub
//   const { name, animal, age, bio, imageUrl } = req.body

//   db.insertPet({ name, animal, age, bio, ownerId })
//     .then((result) => {
//       const newId = result[0]
//       const newImage = {
//         petId: newId,
//         imageUrl,
//       }
//       return db.insertImage(newImage)
//     })
//     .then(() => {
//       res.sendStatus(201)
//     })
//     .catch((err) => {
//       console.log(err.message)
//       res.status(500).json({ message: 'Something went wrong' })
//     })
// })

// router.post('/image', checkJwt, (req, res) => {
//   // 32147812897523
//   const timestamp = Math.round(new Date().getTime() / 1000)

//   const signature = cloudinary.utils.api_sign_request(
//     {
//       timestamp,
//     },
//     apiSecret
//   )

//   res.json({
//     signature,
//     timestamp,
//     cloudName,
//     apiKey,
//   })
// })

export default router