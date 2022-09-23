import {
  addNewPost,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
} from '../addPost'
import { addPost } from '../../apis/posts'

jest.mock('../../apis/posts')

const fakeDispatch = jest.fn()

jest.spyOn(console, 'error')

beforeEach(() => {
  jest.clearAllMocks()
})
const fakeData = {
  id: 1,
  title: 'I ate an apple',
  date_eaten: '2022-09-22',
  content: 'this is a very long string that can be changed later',
  img: 'www.googleimages.com/bears',
  user_id: 1,
  date_created: '2022-09-22',
}

describe('addNewPost', () => {
  it('checks if the request is loading and then it dispatches the ADD_POST_SUCCESS action if the promise resolves', () => {
    expect.assertions(3)
    addPost.mockReturnValue(Promise.resolve(fakeData))
    return addNewPost(fakeData)(fakeDispatch).then(() => {
      expect(fakeDispatch.mock.calls[0][0].type).toBe(ADD_POST_REQUEST)
      expect(fakeDispatch.mock.calls[1][0].type).toBe(ADD_POST_SUCCESS)
      expect(fakeDispatch.mock.calls[1][0].payload.title).toBe('I ate an apple')
    })
  })
  it('should dispatch the ADD_POST_FAILURE action if the promise rejects', () => {
    expect.assertions(2)
    addPost.mockImplementation(() => Promise.reject(new Error('Broken!')))
    return addNewPost(fakeData)(fakeDispatch).then(() => {
      expect(fakeDispatch.mock.calls[1][0].type).toBe(ADD_POST_FAILURE)
      expect(fakeDispatch.mock.calls[1][0].payload.errMessage).toBe('Broken!')
    })
  })
})
