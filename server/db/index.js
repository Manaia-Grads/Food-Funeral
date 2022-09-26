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

function getAllCommentsByPostId(id, db = connection) {
  return db('comments')
    .select(
      '*',
      'post_id as postId',
      'auth0_id as auth0Id',
      'date_created as date'
    )
    .where('post_id', id)
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
  deletePostById,
  getAllCommentsByPostId,
  getCommentById,
  addComment,
}
