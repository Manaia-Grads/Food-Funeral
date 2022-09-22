import request from 'superagent'
const rootURL = '/api/v1'

export function getPosts() {
  return request
    .get(rootURL + '/posts')
    .then((res) => {
      return res.body
    })
    .catch((err) => console.error(err))
}

export function getPostById(id) {
  return request
    .get(`${rootURL}/posts/${id}`)
    .then((res) => {
      return res.body
    })
    .catch((err) => console.error(err))
}
