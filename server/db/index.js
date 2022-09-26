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
    img: post.image,
    auth0_id: post.auth0_id,
    name: post.name,
    date_created: Date.now(),
  })
}

function deletePostById(postId, db = connection) {
  return db('posts').where('id', postId).del()
}

module.exports = {
  getAllPosts,
  getPostById,
  addPost,
  deletePostById,
}
