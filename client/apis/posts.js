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

export function getUser(token) {
  return request
    .get(`${rootURL}/users`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => res.body)
    .catch(logError)
}

export function addUser(user, token) {
  return request
    .post(`${rootURL}/users`)
    .set('Authorization', `Bearer ${token}`)
    .send(user)
    .catch(logError)
}

function logError(err) {
  if (err.response.text === 'Username Taken') {
    throw new Error('Username already taken - please choose another')
  } else if (err.message === 'Forbidden') {
    throw new Error('Only the user who added the post may update and delete it')
  } else {
    // eslint-disable-next-line no-console
    console.error('Error consuming the API (in client/api.js):', err.message)
    throw err
  }
}
