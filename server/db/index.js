const connection = require('./connection')

function getPostById(id, db = connection) {
  return db('posts').select().where('id', id).first()
}

function getAllPosts(db = connection) {
  return db('posts').select()
}

function addPost(post, id, db = connection) {
  return db('posts').insert(post).where('id', id)
}

module.exports = {
  getAllPosts,
  getPostById,
  addPost,
}
