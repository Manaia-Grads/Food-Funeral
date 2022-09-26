exports.up = function (knex) {
  return knex.schema.createTable('comments', (table) => {
    table.increments('id')
    table.varchar('content')
    table.integer('post_id').references('posts.id')
    table.string('auth0_id')
    table.string('name')
    table.date('date_created')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('comments')
}
