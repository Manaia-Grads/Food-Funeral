exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('posts')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {
          id: 1,
          title: 'I ate a cow',
          date_eaten: '2022-09-22',
          content: 'this is a very long string that can be changed later',
          img: 'tomato.png',
          auth0_id: 'google-oauth2|103547991597142817347',
          name: 'John Foo',
          date_created: '2022-09-22',
        },
        {
          id: 2,
          title: 'I ate a banana',
          date_eaten: '2022-09-20',
          content: 'this is a very long string that can be changed later',
          img: 'tomato.png',
          auth0_id: 'google-oauth2|103547991597142817347',
          name: 'John Foo',
          date_created: '2022-09-21',
        },
        {
          id: 3,
          title: 'I ate a potato',
          date_eaten: '2022-09-19',
          content: 'this is a very long string that can be changed later',
          img: 'tomato.png',
          auth0_id: 'google-oauth2|103547991597142817347',
          name: 'John Foo',
          date_created: '2022-09-20',
        },
      ])
    })
}
