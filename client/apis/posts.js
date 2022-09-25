import request from 'superagent'
const rootURL = '/api/v1'

export function getPosts() {
  return request
    .get(rootURL + '/posts')
    .then((res) => {
      return res.body
    })
    .catch((err) => console.error(err.message))
}

export function getPostById(id) {
  return request
    .get(`${rootURL}/posts/${id}`)
    .then((res) => {
      return res.body
    })
    .catch((err) => console.error(err.message))
}

export function addPost(post) {
  return request
    .post(`${rootURL}/posts`)
    .send(post)
    .then((res) => {
      return res.body
    })
    .catch((err) => console.error(err.message))
}
