import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const { user, logout, loginWithRedirect, isLoading, isAuthenticated } =
    useAuth0()

  const handleLogOff = (e) => {
    e.preventDefault()
    return logout()
  }

  const handleSignIn = (e) => {
    e.preventDefault()
    return loginWithRedirect()
  }

  return !isLoading ? (
    <>
      <div>
        <div className="mx-auto flex flex-wrap items-center justify-between">
          <div className=" hidden w-full md:block" id="navbar-default">
            <ul className="mt-4 flex flex-col border-custom-black bg-custom-blue p-2 md:mt-0 md:flex-row md:space-x-4 md:border-4 md:text-sm md:font-medium">
              <li>
                <Link
                  to="/"
                  className="border-custom-black hover:bg-custom-yellow block rounded py-2 px-4 border-2 bg-custom-white p-2 text-black font-fredoka-one"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/create-post"
                  className="border-custom-black hover:bg-custom-pink block rounded py-2 px-4 border-2 bg-custom-white p-2 text-black font-fredoka-one"
                >
                  Create Post
                </Link>
              </li>

              {isAuthenticated ? (
                <>
                  <li
                    data-testid="username"
                    className="absolute right-32 mt-2 md:text-white"
                  >
                    {user?.nickname}
                  </li>

                  {/* <li className="absolute right-32  md:w-10">
                    <img className="rounded-full" alt={user?.name} />
                  </li> */}

                  <li className="absolute right-5 border-custom-black hover:bg-custom-grey block rounded py-2 px-4 border-2 bg-custom-white p-2 text-black font-fredoka-one">
                    <div>
                      <button data-testid="logoff" onClick={handleLogOff}>
                        Log Off
                      </button>
                    </div>
                  </li>
                </>
              ) : (
                <li className="absolute right-5 border-custom-black hover:bg-custom-grey block rounded py-2 px-4 border-2 bg-custom-white p-2 text-black font-fredoka-one">
                  <button data-testid="signin" onClick={handleSignIn}>
                    Sign In
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  ) : (
    <img
      className="m-auto flex w-20"
      src={'/images/loading.gif'}
      alt="loading"
    ></img>
  )
}
