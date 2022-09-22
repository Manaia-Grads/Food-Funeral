import {GET_POSTS_REQUEST, GET_POSTS_SUCCESS, GET_POSTS_FAILURE} from '../actions/posts'

const initialState = {
  data:null,
  loading: true,
  error: null,
}

const reducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case GET_POSTS_REQUEST:
      return {...state,loading:true}
      case GET_POSTS_SUCCESS:
        return { ...state, data: payload.posts, loading: false, error: null }
      case GET_POSTS_FAILURE:
        return { ...state, loading: false, error: payload.errMessage }
    default:
      return state
  }
}

export default reducer
