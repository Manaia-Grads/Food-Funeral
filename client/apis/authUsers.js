import request from 'superagent'

export function getUserName(id) {
  return request.get('/api/v2/users/' + id).then((res) => console.log(res.body))
}
