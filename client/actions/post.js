export const GET_POST_REQUEST = 'GET_POST_REQUEST'
export const GET_POST_SUCCESS = 'GET_POST_SUCCESS'
export const GET_POST_FAILURE = 'GET_POST_FAILURE'
export const DELETE_POST = 'GET_POST_FAILURE'
import { getPostById } from '../apis/posts'

export const getPostRequest = () => ({
  type: GET_POST_REQUEST,
})

export const getPostSuccess = (post) => ({
  type: GET_POST_SUCCESS,
  payload: { post },
})

export const getPostFailure = (errMessage) => ({
  type: GET_POST_FAILURE,
  payload: { errMessage },
})

export const getPost = (id) => (dispatch) => {
  dispatch(getPostRequest())
  return getPostById(id)
    .then((post) => {
      dispatch(getPostSuccess(post))
    })
    .catch((error) => {
      dispatch(getPostFailure(error.message))
    })
}
