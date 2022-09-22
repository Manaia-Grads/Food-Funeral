import { getPosts } from '../apis/posts'

export const GET_POSTS_REQUEST = 'GET_POSTS_REQUEST'
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'
export const GET_POSTS_FAILURE = 'GET_POSTS_FAILURE'

export function getPostsRequest() {
  return {
    type: GET_POSTS_REQUEST,
  }
}

export function getPostsSuccess(posts) {
  return {
    type: GET_POSTS_SUCCESS,
    payload: { posts },
  }
}

export function getPostsFailure(errMessage) {
  return {
    type: GET_POSTS_FAILURE,
    payload: { errMessage },
  }
}

export function fetchPosts() {
  console.log('Krissy wants it')
  return (dispatch) => {
    dispatch(getPostsRequest())
    return getPosts()
      .then((posts) => {
        console.log('posts', posts)
        dispatch(getPostsSuccess(posts))
      })
      .catch((err) => {
        dispatch(getPostsFailure(err.message))
      })
  }
}
