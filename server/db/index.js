const connection = require('./connection')

module.exports = {
  getPostById,
}
function getPostById(id, db = connection) {
  return db('posts').select().where('id', id)
}
