const request = require('supertest')
const server = require('../../server')

const {
  getAllCommentsByPostId,
  getCommentById,
  addComment,
} = require('../../db/index.js')
const { get } = require('superagent')

jest.mock('../../db/index.js')

jest.spyOn(console, 'error')

afterEach(() => {
  console.error.mockReset()
})

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
  it('returns status 200 and an array of objects on promise resolution', () => {
    getAllCommentsByPostId.mockReturnValue(Promise.resolve(fakeComments))
    return request(server)
      .get('/api/v1/posts/1/comments')
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body).toHaveLength(2)
        expect(res.body[0].content).toBe('test yummy!!')
      })
  })
  it('returns status 500 and an error message when db function rejects', () => {
    getAllCommentsByPostId.mockImplementation(() =>
      Promise.reject(new Error('oh dear, sad'))
    )
    return request(server)
      .get('/api/v1/posts/1/comments')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.body.message).toBe('Something went wrong')
        expect(console.error).toHaveBeenCalledWith(new Error('oh dear, sad'))
      })
  })
})
