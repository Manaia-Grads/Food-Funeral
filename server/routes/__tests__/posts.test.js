const request = require('supertest')
const server = require('../../server')

const { getPostById } = require('../../db/')
jest.mock('../../db/')

jest.spyOn(console, 'error')

afterEach(() => {
  console.error.mockReset()
})

const fakeObjectArray = [
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

describe('GET /api/v1/posts/:id', () => {
  it('returns status 200 and an array of objects when db function resolves', () => {
    getPostById.mockReturnValue(Promise.resolve(fakeObjectArray))
    return request(server)
      .get('/api/v1/posts/2')
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body).toHaveLength(1)
        expect(res.body[0].content).toBe(
          'this is a very long string that can be changed later'
        )
        return null
      })
  })
  it('returns status 500 and an error message when db function rejects', () => {
    getPostById.mockImplementation(() =>
      Promise.reject(new Error('oh dear, sad'))
    )
    return request(server)
      .get('/api/v1/posts/2')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.text).toBe('oh dear, sad')
        return null
      })
  })
})
