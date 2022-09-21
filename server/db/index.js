const connection = require('./connection')

function getAllPosts(db = connection){
  return db('posts').select()
}

module.exports = {
  getAllPosts
}