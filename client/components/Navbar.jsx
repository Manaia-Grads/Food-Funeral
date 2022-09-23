import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="flex">
      <Link className="flex-auto" to="/">
        View All Blogs
      </Link>
      <Link className="flex-auto" to="/create-post">
        Create Post
      </Link>
      <Link className="flex-auto" to="/undefined">
        Register 💀
      </Link>
    </nav>
  )
}
