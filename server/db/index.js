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
    img: post.img,
    auth0_id: post.auth0_id,
    date_created: Date.now(),
  })
}

function getAllCommentsByPostId(id, db = connection) {
  return db('comments').select().where('post_id', id)
}

function addComment(comment, postId, db = connection) {
  return db('comments').insert({
    content: comment.content,
    post_id: postId,
    auth0_id: comment.auth0Id,
    date_created: Date.now(),
  })
}

function getCommentById(id, db = connection) {
  return db('comments').select().where('id', id).first()
}

module.exports = {
  getAllPosts,
  getPostById,
  addPost,
  getAllCommentsByPostId,
  getCommentById,
  addComment,
}
