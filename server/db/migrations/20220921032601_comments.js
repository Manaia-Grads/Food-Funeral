exports.up = function (knex) {
  return knex.schema.createTable('comments', (table) => {
    table.increments('id')
    table.varchar('content')
    table.integer('post_id')
    table.integer('user_id')
    table.date('date_created')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('comments')
}
