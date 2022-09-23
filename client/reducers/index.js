import { combineReducers } from 'redux'

import posts from './posts'
import post from './post'
import addPost from './addPost'

export default combineReducers({
  posts,
  post,
  addPost,
})
