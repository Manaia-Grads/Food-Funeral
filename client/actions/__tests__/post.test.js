import {
  getPost,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
} from '../post'
import { getPostById } from '../../apis/posts'

jest.mock('../../apis/posts')

const fakeDispatch = jest.fn()

jest.spyOn(console, 'error')

beforeEach(() => {
  jest.clearAllMocks()
})

const fakeData = {
  id: 1,
  title: 'I ate a apple',
  date_eaten: '2022-09-22',
  content: 'this is a very long string that can be changed later',
  img: 'www.googleimages.com/bears',
  user_id: 1,
  date_created: '2022-09-22',
}

describe('getPost', () => {
  it('checks if the request is loading and then it dispatches the GET_POST_SUCCESS action if the promise resolves', () => {
    expect.assertions(2)
    getPostById.mockReturnValue(Promise.resolve(fakeData))
    return getPost(1)(fakeDispatch).then(() => {
      expect(fakeDispatch.mock.calls[0][0].type).toBe(GET_POST_REQUEST)
      expect(fakeDispatch.mock.calls[1][0].type).toBe(GET_POST_SUCCESS)
    })
  })
  it('should dispatch the GET_POST_FAILURE action if the promise rejects', () => {
    expect.assertions(2)
    getPostById.mockImplementation(() => Promise.reject(new Error('Broken!')))
    return getPost()(fakeDispatch).then(() => {
      expect(fakeDispatch.mock.calls[1][0].type).toBe(GET_POST_FAILURE)
      expect(fakeDispatch.mock.calls[1][0].payload.errMessage).toBe('Broken!')
    })
  })
})
