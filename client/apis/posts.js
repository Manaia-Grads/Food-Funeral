import request from 'superagent'

const rootUrl = '/api/v1'

export function getPostById(id) {
  return request.get(`${rootUrl}/posts/${id}`).then((res) => {
    return res.body
  })
}
