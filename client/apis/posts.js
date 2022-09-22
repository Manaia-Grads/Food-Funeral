import request from 'superagent'

const rootURL = '/api/v1/posts'

export function getPostById(id) {
  return request
    .get(`${rootURL}/${id}`)
    .then((res) => {
      return res.body
    })
    .catch((err) => console.error(err))
}
