const request = require('supertest')
const server = require('../../server')

const { getAllPosts, getPostById, addPost } = require('../../db/index.js')

//----auth
import { checkJwt } from '../../auth0'

jest.mock('../../db/index.js')

jest.spyOn(console, 'error')

afterEach(() => {
  console.error.mockReset()
})

//-----auth
const FAKE_USER_ID = 'auth0|123456789'
checkJwt.mockImplementation((req, res, next) => {
  req.user = { sub: FAKE_USER_ID }
  return next()
})

const fakeData = [
  {
    id: 1,
    title: 'I ate a banana',
    date: '2022-09-22',
    content: 'this is a very long string that can be changed later',
    image: 'www.googleimages.com/bears',
    auth0_id: 'auth0|12345',
    name: 'John Foo',
    date_created: '2022-09-22',
  },
  {
    id: 2,
    title: 'I ate a banana',
    date: '2022-09-20',
    content: 'this is a very long string that can be changed later',
    image: 'www.googleimages.com/banana',
    auth0_id: 'auth0|12345',
    name: 'Gazza',
    date_created: '2022-09-21',
  },
  {
    id: 3,
    title: 'I ate a potato',
    date: '2022-09-19',
    content: 'this is a very long string that can be changed later',
    image: 'www.googleimages.com/poodle',
    auth0_id: 'auth0|12346',
    name: 'John is Potato',
    date_created: '2022-09-20',
  },
]

describe('GET /api/v1/posts/:id', () => {
  it('returns status 200 and an array of objects when db function resolves', () => {
    getPostById.mockReturnValue(Promise.resolve(fakeData[1]))
    return request(server)
      .get('/api/v1/posts/2')
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body.content).toBe(
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
      })
  })
})

describe('GET /api/v1/posts', () => {
  it('returns status 200 and an array of objects when db function resolves', () => {
    getAllPosts.mockReturnValue(Promise.resolve(fakeData))
    return request(server)
      .get('/api/v1/posts')
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body).toHaveLength(3)
        expect(res.body[0].title).toBe('I ate a banana')
      })
  })
  it('returns status 500 and an error message when db function rejects', () => {
    getAllPosts.mockImplementation(() =>
      Promise.reject(new Error('oh dear, sad'))
    )

    return request(server)
      .get('/api/v1/posts')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(console.error).toHaveBeenCalledWith(new Error('oh dear, sad'))
        expect(res.body.message).toBe('Something went wrong')
        return null
      })
  })
})

//----------needs auth
describe('POST /api/v1/posts', () => {
  it('returns status 200 and the post data object when db function resolves', () => {
    const newPostId = 26
    addPost.mockReturnValue(Promise.resolve([newPostId]))
    getPostById.mockReturnValue(
      Promise.resolve({ ...fakeData[0], id: newPostId })
    )
    return (
      request(server)
        .post('/api/v1/posts')
        //.set('Authorization', 'Bearer imafaketoken')
        .send(fakeData[0])
        .then((res) => {
          expect(res.status).toBe(200)
          expect(res.body.id).toBe(newPostId)
          expect(res.body.title).toBe('I ate a banana')
        })
    )
  })
  it('returns status 500 and an error message when db function rejects', () => {
    addPost.mockImplementation(() => Promise.reject(new Error('oh dear, sad')))

    return request(server)
      .get('/api/v1/posts')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(console.error).toHaveBeenCalledWith(new Error('oh dear, sad'))
        return null
      })
  })
})
