import nock from 'nock'
import { getPostById } from '../posts'

const fakeData = [
  {
    id: 2,
    title: 'I ate a banana',
    date_eaten: '2022-09-20',
    content: 'this is a very long string that can be changed later',
    img: 'www.googleimages.com/banana',
    user_id: 2,
    date_created: '2022-09-21',
  },
]

describe('GET /api/v1/posts', () => {
  it('gets a single array of a post', async () => {
    expect.assertions(2)
    const scope = nock('http://localhost')
      .get('/api/v1/posts/2')
      .reply(200, fakeData)

    const post = await getPostById(2)
    expect(post).toEqual(fakeData)
    expect(scope.isDone()).toBe(true)
  })
})
