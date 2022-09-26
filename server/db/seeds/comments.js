exports.seed = function (knex) {
  return knex('comments')
    .del()
    .then(function () {
      return knex('comments').insert([
        {
          id: 1,
          content: 'yum!!',
          post_id: '1',
          auth0_id: 'google-oauth2|103547991597142817347',
          name: 'John Foo',
          date_created: '2022-09-22',
        },
        {
          id: 2,
          content: 'a cow, really??',
          post_id: '1',
          auth0_id: 'google-oauth2|103547991597142817347',
          name: 'John Foo',
          date_created: '2022-09-22',
        },
      ])
    })
}
