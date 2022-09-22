const express = require('express')
const checkJwt = require('../auth0')

const db = require('../db/users')
const router = express.Router()

router.get('/', checkJwt, (req, res) => {
  const auth0_id = req.user?.sub
  if (!auth0_id) {
    res.sendStatus(400)
  } else {
    db.getUser(auth0_id)
      .then((user) => {
        res.json(user)
      })
      .catch((err) => res.status(500).send(err.message))
  }
})

router.post('/', checkJwt, (req, res) => {
  const auth0_id = req.user?.sub
  const { name, email } = req.body
  const userDetails = {
    auth0_id,
    name,
    email,
  }

  db.userExists(name)
    .then((usernameTaken) => {
      if (usernameTaken) {
        throw new Error('Username Taken')
      } else {
        return db.createUser(userDetails)
      }
    })
    .then(() => res.sendStatus(201))
    .catch((err) => {
      if (err.message === 'Username Taken') {
        res.status(403).send('Username Taken')
      } else {
        res.status(500).send(err.message)
      }
    })
})

module.exports = router