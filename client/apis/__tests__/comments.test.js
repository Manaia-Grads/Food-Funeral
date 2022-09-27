import nock from 'nock'
import { getCommentsByPostId, getCommentById, addComment } from '../comments'

jest.spyOn(console, 'error')

afterEach(() => {
  console.error.mockReset()
})

const rootURL = 'http://localhost'

const fakeComments = [
  {
    id: 1,
    content: 'test yummy!!',
    post_id: '1',
    auth0_id: 'google-oauth2|103547991597142817347',
    name: 'Alonso',
    date_created: '1664233155372',
  },
  {
    id: 2,
    content: 'test a cow, really??',
    post_id: '1',
    auth0_id: 'google-oauth2|103547991597142817347',
    name: 'John Foo',
    date_created: '1664233155375',
  },
]

describe('GET /api/v1/posts/:id/comments', () => {
  it('gets an array of comment objects', async () => {
    expect.assertions(2)
    const scope = nock(rootURL)
      .get('/api/v1/posts/1/comments')
      .reply(200, fakeComments)

    const comments = await getCommentsByPostId(1)
    expect(comments).toHaveLength(2)
    expect(scope.isDone()).toBe(true)
  })
  it.todo('returns an error on getAllCommentsById')
})

describe('POST /api/v1/posts/:id/comments', () => {
  it.todo('returns one new comment')
  it.todo('returns an error on addComment')
  it.todo('returns an error on getCommentById')
})
