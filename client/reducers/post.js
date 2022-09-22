import {
  GET_POST_FAILURE,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
} from '../actions/post'

const initialState = {
  data: null,
  loading: true,
  error: null,
}
export default function myPostReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_POST_REQUEST:
      return { ...state, loading: true, error: null }
    case GET_POST_SUCCESS:
      return { data: payload.post, loading: false, error: null }
    case GET_POST_FAILURE:
      return { ...state, loading: false, error: payload.error }
    default:
      return state
  }
}
