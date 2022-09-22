const connection = require('./connection')

function getPostById(id, db = connection) {
  return db('posts').select().where('id', id).first()
}

function getAllPosts(db = connection) {
  return db('posts').select()
}

module.exports = {
  getAllPosts,
  getPostById,
}
