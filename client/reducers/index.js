import { combineReducers } from 'redux'

import posts from './posts'
import post from './post'
import comments from './comments'

export default combineReducers({
  posts,
  post,
  comments,
})
