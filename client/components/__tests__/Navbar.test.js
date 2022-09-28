import { useAuth0 } from '@auth0/auth0-react'
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { MemoryRouter as Router } from 'react-router-dom'
import '@testing-library/jest-dom'

import Navbar from '../Navbar'

jest.mock('@auth0/auth0-react')

const fakeLogout = jest.fn()
const fakeLogin = jest.fn()

describe('<Navbar />', () => {
  // text when signed in
  it('should render Log off when user is signed in (is authenticated)', () => {
    useAuth0.mockImplementation(() => ({
      logout: fakeLogout,
      loginWithRedirect: fakeLogin,
      isAuthenticated: true,
      isLoading: false,
      user: {
        name: 'Tom Foolery',
        nickname: 'Uncle Tom',
        picture:
          'https://images.unsplash.com/photo-1657214059388-a35554015a42?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      },
    }))
    render(<Navbar />, { wrapper: Router })

    const logOffButton = screen.getByText(/log off/i)
    expect(logOffButton).toBeInTheDocument()
  })
  //text when signed out
  it('should render Log In when user is signed off (is !Authenticated)', () => {
    useAuth0.mockImplementation(() => ({
      logout: fakeLogout,
      loginWithRedirect: fakeLogin,
      isAuthenticated: false,
      isLoading: false,
    }))
    render(<Navbar />, { wrapper: Router })

    const logOffButton = screen.getByText(/sign in/i)
    expect(logOffButton).toBeInTheDocument()
  })
  // click the button when signed out
  it('should call login when login button is pressed', async () => {
    useAuth0.mockImplementation(() => ({
      logout: fakeLogout,
      loginWithRedirect: fakeLogin,
      isAuthenticated: false,
      isLoading: false,
    }))
    render(<Navbar />, { wrapper: Router })
    const signInButton = screen.getByRole('button', { name: /sign in/i })

    await fireEvent.click(signInButton)

    expect(fakeLogin).toHaveBeenCalled()
  })
  // click the button when signed in
  it('should call logout when log off button is pressed', async () => {
    useAuth0.mockImplementation(() => ({
      logout: fakeLogout,
      loginWithRedirect: fakeLogin,
      isAuthenticated: true,
      isLoading: false,
    }))
    render(<Navbar />, { wrapper: Router })
    const logOffButton = screen.getByRole('button', { name: /log off/i })

    await fireEvent.click(logOffButton)

    expect(fakeLogout).toHaveBeenCalled()
  })
})
