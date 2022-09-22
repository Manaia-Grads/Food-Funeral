exports.seed = function (knex) {
  return knex('users')
    .del()
    .then(function () {
      return knex('users').insert([
        { auth0_id: '1', name: 'Cool', email: 'cool@email.com'},
        { auth0_id: '2', name: 'Bananas', email: 'bananas@email.com'},
        { auth0_id: '3', name: 'Not So Cool', email: 'notsocool@email.com'},
        { auth0_id: '4', name: 'Beans', email: 'beans@email.com'}
      ])
    })
}
