import nock from 'nock'
import { getCommentsByPostId, addComment } from '../comments'

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

const errMessage = 'uh oh, this is an error'

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
  it('returns an error on getCommentsById', async () => {
    expect.assertions(2)

    const scope = nock(rootURL)
      .get('/api/v1/posts/1/comments')
      .replyWithError(errMessage)
    return getCommentsByPostId(1).then(() => {
      expect(scope.isDone()).toBeTruthy()
      expect(console.error).toHaveBeenCalledWith(errMessage)
    })
  })
})

const id = 3

const postId = 1

const fakeNewComment = {
  content: 'test a beret, really??',
  auth0_id: 'google-oauth2|103547991597142817347',
  name: 'Foo Bar',
  date_created: '1664233155375',
}

describe('POST /api/v1/posts/:id/comments', () => {
  it('returns one new comment', async () => {
    expect.assertions(3)

    const scope = nock(rootURL)
      .post('/api/v1/posts/1/comments')
      .reply(200, { ...fakeNewComment, postId, id })

    const newComment = await addComment(fakeNewComment, postId)
    expect(Object.keys(newComment)).toHaveLength(6)
    expect(newComment.name).toBe('Foo Bar')
    expect(scope.isDone()).toBe(true)
  })
  it('returns an error on addComment', async () => {
    expect.assertions(2)

    const scope = nock(rootURL)
      .post('/api/v1/posts/1/comments')
      .replyWithError(errMessage)
    return addComment(fakeNewComment, postId).then(() => {
      expect(scope.isDone()).toBeTruthy()
      expect(console.error).toHaveBeenCalledWith(errMessage)
    })
  })
})
