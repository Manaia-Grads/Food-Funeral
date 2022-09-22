export const FETCH_POST_REQUEST = 'FETCH_POST_REQUEST'
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS'
export const FETCH_POST_FAILURE = 'FETCH_POST_FAILURE'
import { getPostById } from '../apis/posts'

export const fetchPostRequest = () => ({
  type: FETCH_POST_REQUEST,
})

export const fetchPostSuccess = (post) => ({
  type: FETCH_POST_SUCCESS,
  payload: { post },
})

export const fetchPostFailure = (error) => ({
  type: FETCH_POST_FAILURE,
  payload: { error },
})

export const fetchPost = (id) => (dispatch) => {
  dispatch(fetchPostRequest())
  getPostById(id)
    .then((post) => {
      dispatch(fetchPostSuccess(post))
    })
    .catch((error) => {
      dispatch(fetchPostFailure(error.message))
    })
}
