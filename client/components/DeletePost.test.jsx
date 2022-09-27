import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
import { MemoryRouter as Router } from 'react-router-dom'
import DeletePost from './DeletePost'

const fakeUser = {
  name: 'Benana',
  email: 'benana@devacademy.co.nz',
  sub: 'whateverrubbish',
}

jest.mock('@auth0/auth0-react')

beforeEach(() => {
  useAuth0.mockReturnValue({
    isAuthenticated: true,
    user: {
      ...fakeUser,
    },
    logoutWithRedirect: jest.fn(),

    getAccessTokenSilently: () => {
      return Promise.resolve('token')
    },
  })
})

describe('<DeletePost />', () => {
  it('does not show delete button when you did not create the post, AKA, the auth0_id does not match', () => {
    render(
      <Router>
        <DeletePost id="" auth0_id={'rubbish'} />
      </Router>
    )
    expect(
      screen.queryByRole('button', { name: /delete/i })
    ).not.toBeInTheDocument()
  })

  it('displays delete button when user created the post, AKA, When auth_0 id matches', () => {
    render(
      <Router>
        <DeletePost id="" auth0_id={'whateverrubbish'} />
      </Router>
    )

    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
  })
})
