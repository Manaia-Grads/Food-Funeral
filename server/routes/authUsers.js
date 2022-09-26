const request = require('superagent')

function getAuthDetails(id) {
  return request.get('/api/v2/users/' + id).then((res) => console.log(res.body))
}

module.exports = getAuthDetails
