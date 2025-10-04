import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { useAuth } from '../context/AuthContext'

const Navbar: React.FC = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="w-full bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-bold text-lg text-primary">DecodeMan</Link>
          <nav className="hidden md:flex gap-3">
            <Link to="/contributor/my-repos" className="text-sm hover:underline">My Repos</Link>
            <Link to="/contributor/contributed-repos" className="text-sm hover:underline">Contributed</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Button variant="ghost" onClick={() => navigate('/contributor/profile')}>Profile</Button>
              <Button variant="outline" onClick={logout}>Logout</Button>
            </>
          ) : (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
