const connection = require('./connection')

function getPostById(id, db = connection) {
  return db('posts').select().where('id', id).first()
}

function getAllPosts(db = connection) {
  return db('posts').select()
}

function addPost(post, db = connection) {
  return db('posts').insert({
    title: post.title,
    content: post.content,
    date_eaten: post.date,
  })
}

module.exports = {
  getAllPosts,
  getPostById,
  addPost,
}
