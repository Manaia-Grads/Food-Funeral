import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  CLEAR_ADD_COMMENT,
  DISPLAY_COMMENTS_FAILURE,
  DISPLAY_COMMENTS_REQUEST,
  DISPLAY_COMMENTS_SUCCESS,
  CLEAR_DISPLAY_COMMENTS,
} from '../actions/comments'

const initialState = {
  data: [],
  loading: true,
  error: null,
}
export default function myCommentReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case ADD_COMMENT_REQUEST:
      return { ...state, loading: true, error: null }
    case ADD_COMMENT_SUCCESS:
      return { data: [...state.data, payload], loading: false, error: null }
    case ADD_COMMENT_FAILURE:
      return { ...state, loading: false, error: payload.error }
    case CLEAR_ADD_COMMENT:
      return initialState
    case DISPLAY_COMMENTS_REQUEST:
      return { ...state, loading: true, error: null }
    case DISPLAY_COMMENTS_SUCCESS:
      return { data: payload, loading: false, error: null }
    case DISPLAY_COMMENTS_FAILURE:
      return { ...state, loading: false, error: payload.error }
    case CLEAR_DISPLAY_COMMENTS:
      return initialState
    default:
      return state
  }
}
