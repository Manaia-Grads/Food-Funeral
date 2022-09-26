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

export function addPost(post, token) {
  return request
    .post(`${rootURL}/posts`)
    .set('Authorization', `Bearer ${token}`)
    .send(post)
    .then((res) => {
      return res.body
    })
    .catch((err) => console.error(err.message))
}

export function deletePostDataById(id){
  return request.delete(rootURL+'/posts/'+id)
    .then((res)=>{
    console.log(res.status)
    return res.body
  })
}