import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
} from '../actions/addPost'

const initialState = {
  data: null,
  loading: true,
  error: null,
}
export default function myPostReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case ADD_POST_REQUEST:
      return { ...state, loading: true, error: null }
    case ADD_POST_SUCCESS:
      return { data: payload, loading: false, error: null }
    case ADD_POST_FAILURE:
      return { ...state, loading: false, error: payload.error }
    default:
      return state
  }
}
