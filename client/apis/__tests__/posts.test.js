import nock from 'nock'
import { getPosts } from '../posts'

const fakeData = [
  {
    id: 1,
    title: 'I ate a apple',
    date_eaten: '2022-09-22',
    content: 'this is a very long string that can be changed later',
    img: 'www.googleimages.com/bears',
    user_id: 1,
    date_created: '2022-09-22',
  },
  {
    id: 2,
    title: 'I ate a cranberry',
    date_eaten: '2022-09-20',
    content: 'this is a very long string that can be changed later',
    img: 'www.googleimages.com/banana',
    user_id: 2,
    date_created: '2022-09-21',
  },
  {
    id: 3,
    title: 'I ate a potato',
    date_eaten: '2022-09-19',
    content: 'this is a very long string that can be changed later',
    img: 'www.googleimages.com/poodle',
    user_id: 3,
    date_created: '2022-09-20',
  },
]

describe('GET /api/v1/posts', () => {
  it('gets an array of post objects', async () => {
    expect.assertions(2)
    const scope = nock('http://localhost')
      .get('/api/v1/posts')
      .reply(200, fakeData)

    const posts = await getPosts()
    expect(posts).toEqual(fakeData)
    expect(scope.isDone()).toBe(true)
  })
})