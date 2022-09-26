exports.seed = function (knex) {
  return knex('comments')
    .del()
    .then(function () {
      return knex('comments').insert([
        {
          id: 1,
          content: 'yum!!',
          post_id: '1',
          auth0_id: 'Guest',
          date_created: '1664228794421',
        },
        {
          id: 2,
          content: 'a cow, really??',
          post_id: '1',
          auth0_id: 'Guest',
          date_created: '1554228794421',
        },
      ])
    })
}
