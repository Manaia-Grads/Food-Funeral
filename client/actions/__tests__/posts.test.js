import {
  fetchPosts,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
} from '../posts'
import { getPosts } from '../../apis/posts'

jest.mock('../../apis/posts')

const fakeDispatch = jest.fn()

jest.spyOn(console, 'error')

beforeEach(() => {
  jest.clearAllMocks()
})

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

describe('fetchPosts', () => {
  it('checks if the request is loading and then it dispatches the GET_POSTS_SUCCESS action if the promise resolves', () => {
    expect.assertions(3)
    getPosts.mockReturnValue(Promise.resolve(fakeData))
    return fetchPosts()(fakeDispatch).then(() => {
      expect(fakeDispatch.mock.calls[1][0].type).toBe(GET_POSTS_SUCCESS)
      expect(fakeDispatch.mock.calls[0][0].type).toBe(GET_POSTS_REQUEST)
      expect(fakeDispatch.mock.calls[1][0].payload.posts).toHaveLength(3)
    })
  })
  it('should dispatch the GET_POSTS_FAILURE action if the promise rejects', () => {
    expect.assertions(2)
    getPosts.mockImplementation(() =>
      Promise.reject(new Error('uh oh, no worky'))
    )
    return fetchPosts()(fakeDispatch).then(() => {
      expect(fakeDispatch.mock.calls[1][0].type).toBe(GET_POSTS_FAILURE)
      expect(fakeDispatch.mock.calls[1][0].payload.errMessage).toBe(
        'uh oh, no worky'
      )
    })
  })
})
