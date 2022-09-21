exports.seed = function (knex) {
  return knex('users')
    .del()
    .then(function () {
      return knex('users').insert([
        { id: 1, user_name: 'Hamish' },
        { id: 2, user_name: 'Ling' },
        { id: 3, user_name: 'Grant' },
      ])
    })
}
