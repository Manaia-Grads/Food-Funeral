const connection = require('./connection')

module.exports = {
  getUser,
  getUsers,
  createUser,
  userExists,
}

function getUser(id, db = connection) {
  return db('users').select('name', 'email').where('auth0_id', id).first()
}

function getUsers(db = connection) {
  return db('users').select()
}

function createUser(userDetails, db = connection) {
  return db('users').insert(userDetails)
}

function userExists(name, db = connection) {
  return db('users')
    .where('name', name)
    .then((usersFound) => usersFound.length > 0)
}
