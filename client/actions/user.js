// export const SET_USER = 'SET_USER'
// export const CLEAR_USER = 'CLEAR_USER'
import {addUser} from "../apis/users"

// export function setUser(user) {
//   return {
//     type: SET_USER,
//     payload: user,
//   }
// }

// export function clearUser() {
//   return {
//     type: CLEAR_USER,
//   }
// }

//this is for: ghetiing additional information about the user beyond the basic userID
//we will need an external api call in the server files to quesry the auth) user profile stuff

// https://auth0.com/docs/api/management/v2#!/Users/get_users_by_id
//https://auth0.com/docs/manage-users/user-search/retrieve-users-with-get-users-endpoint

export function getUserById(id, token) {
  // return request.get(`/api/v1/users/{id}`)
  return null
}



