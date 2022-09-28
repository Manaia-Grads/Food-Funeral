import nock from 'nock'
import { getPosts, getPostById, addPost, deletePostDataById } from '../posts'

jest.spyOn(console, 'error')

afterEach(() => {
  console.error.mockReset()
})

const rootURL = 'http://localhost'

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

describe('GET /api/v1/posts/:id', () => {
  it('gets a single array of a post', async () => {
    expect.assertions(2)
    const scope = nock(rootURL).get('/api/v1/posts/2').reply(200, fakeData[1])

    const post = await getPostById(2)
    expect(post).toEqual(fakeData[1])
    expect(scope.isDone()).toBe(true)
  })
})

describe('GET /api/v1/posts', () => {
  it('gets an array of post objects', async () => {
    expect.assertions(2)
    const scope = nock(rootURL).get('/api/v1/posts').reply(200, fakeData)

    const posts = await getPosts()
    expect(posts).toEqual(fakeData)
    expect(scope.isDone()).toBe(true)
  })
})

describe('POST /api/v1/posts', () => {
  it('returns one (new) post', async () => {
    expect.assertions(2)
    const scope = nock(rootURL).post('/api/v1/posts').reply(200, fakeData[0])

    const post = await addPost(fakeData[0])
    expect(post).toEqual(fakeData[0])
    expect(scope.isDone()).toBe(true)
  })
})

describe('errors are returned correctly', () => {
  const errMessage = 'uh oh, this is an error'
  it('returns an error on getPosts', async () => {
    expect.assertions(2)

    const scope = nock(rootURL).get('/api/v1/posts').replyWithError(errMessage)
    return getPosts().then(() => {
      expect(scope.isDone()).toBeTruthy()
      expect(console.error).toHaveBeenCalledWith(errMessage)
    })
  })
  it('returns an error on getPostsById func', async () => {
    expect.assertions(2)

    const scope = nock(rootURL)
      .get('/api/v1/posts/1')
      .replyWithError(errMessage)
    return getPostById(fakeData[0].id).then(() => {
      expect(scope.isDone()).toBeTruthy()
      expect(console.error).toHaveBeenCalledWith(errMessage)
    })
  })

  it('returns an error when addPost', async () => {
    expect.assertions(2)
    const scope = nock(rootURL).post('/api/v1/posts').replyWithError(errMessage)
    return addPost(fakeData[0]).then(() => {
      expect(scope.isDone()).toBeTruthy()
      expect(console.error).toHaveBeenCalledWith(errMessage)
    })
  })
  it('returns an error on delete PostDataById', async () => {
    expect.assertions(2)
    const scope = nock(rootURL)
      .delete('/api/v1/posts/4')
      .replyWithError(errMessage)
    return deletePostDataById(4).then(() => {
      expect(scope.isDone()).toBeTruthy()
      expect(console.error).toHaveBeenCalledWith(errMessage)
    })
  })
})

describe('DELETE /api/v1/posts/:id', () => {
  it('returns status 200', async () => {
    expect.assertions(1)
    const scope = nock(rootURL).delete('/api/v1/posts/4').reply(200)
    return deletePostDataById(4).then(() => {
      expect(scope.isDone()).toBeTruthy()
    })
  })
})
