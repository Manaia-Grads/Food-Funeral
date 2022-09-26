// TO REMOVE? :

// import React, { useEffect } from 'react'
// import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'

// function MyPosts() {
//   const { getAccessTokenSilently } = useAuth0()

//   useEffect(() => {
//     getAccessTokenSilently()
//       .then((token) => {
//         return fetchMyPosts(token)
//       })
//       .catch((err) => {
//         console.log(err.message)
//       })
//   }, [])

//   return <ul></ul>
// }

// export default withAuthenticationRequired(MyPosts)
