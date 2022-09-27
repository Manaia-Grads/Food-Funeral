const request = require('supertest')
const server = require('../../server')

const {
  getAllPosts,
  getPostById,
  addPost,
  deletePostById,
} = require('../../db/index.js')

//----auth
import checkJwt from '../../auth0'

jest.mock('../../db/index.js')
jest.mock('../../auth0')

jest.spyOn(console, 'error')

beforeEach(() => {
  const FAKE_USER_ID = 'auth0|123456789'
  checkJwt.mockImplementation((req, res, next) => {
    req.auth = { sub: FAKE_USER_ID }
    return next()
  })
})

const fakeSingle = (req, res, next) => {
  req.file = { path: '1234567890123/some/path' }
  next()
}

jest.mock('../../../middleware/multer', () => ({
  multerUpload: {
    single: jest.fn().mockReturnValue(fakeSingle),
  },
}))

afterEach(() => {
  console.error.mockReset()
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

//----TO DO fix me
describe('POST /api/v1/posts', () => {
  it('returns status 200 and the post data object when db function resolves', () => {
    const newPostId = 26
    addPost.mockReturnValue(Promise.resolve([newPostId]))
    getPostById.mockReturnValue(
      Promise.resolve({ ...fakeData[0], id: newPostId })
    )
    return request(server)
      .post('/api/v1/posts')
      .send(fakeData[0])
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body.id).toBe(newPostId)
        expect(res.body.title).toBe('I ate a banana')
      })
  })

  //----TO DO fix me
  it('returns status 500 and an error message when db function rejects', () => {
    addPost.mockImplementation(() => Promise.reject(new Error('oh dear, sad')))

    return request(server)
      .post('/api/v1/posts')
      .send(fakeData[0])
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.text).toBe('oh dear, sad')
        return null
      })
  })

  it('Send unauthorised user to route and returns status 401 - unauthorized', () => {
    checkJwt.mockImplementation((req, res, next) => {
      req.user = { sub: '' }
      return next()
    })

    return request(server)
      .post('/api/v1/posts')
      .then((res) => {
        expect(res.status).toBe(401)
        expect(res.text).toBe('Unauthorized')
        return null
      })
  })
})

// --------testing delete route with auth-------how to test with auth??----
describe('DELETE /api/v1/posts/:id', () => {
  it('returns status 200 when db function resolves', () => {
    deletePostById.mockReturnValue(Promise.resolve({}))
    return request(server)
      .delete('/api/v1/posts/4')
      .then((res) => {
        expect(res.status).toBe(200)
      })
  })
  it('returns status 404 and an error message when db function rejects', () => {
    deletePostById.mockImplementation(() =>
      Promise.reject(new Error('oh dear, sad'))
    )
    return request(server)
      .delete('/api/v1/posts/4')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.text).toBe('oh dear, sad')
        return null
      })
  })
})
