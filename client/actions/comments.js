export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE'
export const CLEAR_ADD_COMMENT = 'CLEAR_ADD_COMMENT'
export const DISPLAY_COMMENTS_REQUEST = 'DISPLAY_COMMENTS_REQUEST'
export const DISPLAY_COMMENTS_SUCCESS = 'DISPLAY_COMMENTS_SUCCESS'
export const DISPLAY_COMMENTS_FAILURE = 'DISPLAY_COMMENTS_FAILURE'
export const CLEAR_DISPLAY_COMMENTS = 'CLEAR_DISPLAY_COMMENTS'

import { addComment, getCommentsByPostId } from '../apis/comments'

export const addCommentRequest = () => ({
  type: ADD_COMMENT_REQUEST,
})

export const addCommentSuccess = (comment) => ({
  type: ADD_COMMENT_SUCCESS,
  payload: comment,
})

export const addCommentFailure = (errMessage) => ({
  type: ADD_COMMENT_FAILURE,
  payload: { errMessage },
})

export const clearAddComment = () => ({
  type: CLEAR_ADD_COMMENT,
})

export const addNewComment = (comment, postId) => (dispatch) => {
  dispatch(addCommentRequest())
  return addComment(comment, postId)
    .then((comment) => {
      dispatch(addCommentSuccess(comment))
    })
    .catch((error) => {
      dispatch(addCommentFailure(error.message))
    })
}

export const displayCommentsRequest = () => ({
  type: DISPLAY_COMMENTS_REQUEST,
})

export const displayCommentsSuccess = (comment) => ({
  type: DISPLAY_COMMENTS_SUCCESS,
  payload: comment,
})

export const displayCommentsFailure = (errMessage) => ({
  type: DISPLAY_COMMENTS_FAILURE,
  payload: { errMessage },
})

export const cleardisplayComments = () => ({
  type: CLEAR_DISPLAY_COMMENTS,
})

export const fetchComments = (postId) => (dispatch) => {
  dispatch(displayCommentsRequest())
  return getCommentsByPostId(postId)
    .then((comments) => {
      dispatch(displayCommentsSuccess(comments))
    })
    .catch((error) => {
      dispatch(displayCommentsFailure(error.message))
    })
}
