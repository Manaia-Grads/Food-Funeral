import request from 'superagent'
const rootURL = '/api/v1/posts'

export function getCommentsByPostId(id) {
  return request
    .get(`${rootURL}/${id}/comments`)
    .then((res) => {
      return res.body
    })
    .catch((err) => console.error(err.message))
}

export function addComment(comment, id) {
  return request
    .post(`${rootURL}/${id}/comments`)
    .send(comment)
    .then((res) => {
      return res.body
    })
    .catch((err) => console.error(err.message))
}
