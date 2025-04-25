import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUserCircle, FaBars } from 'react-icons/fa'
import './Navbar.css'

const Navbar = () => {
  const [user, setUser] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()

  const checkUser = () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        setUser(payload)
      } catch {
        setUser(null)
      }
    } else {
      setUser(null)
    }
  }

  useEffect(() => {
    checkUser()
    window.addEventListener('storage', checkUser)
    window.addEventListener('authUpdated', checkUser)
    return () => {
      window.removeEventListener('storage', checkUser)
      window.removeEventListener('authUpdated', checkUser)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setShowDropdown(false)
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">🩸 BloodHub</Link>
        <button className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}><FaBars /></button>

        <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/donors">Find Donors</Link></li>

          {!user ? (
            <>
              <li><Link to="/register">Become a Donor</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/messages">Messages</Link></li>
              <li className={`dropdown ${showDropdown ? 'open' : ''}`}>
                <span
                  className="dropdown-toggle"
                  onClick={() => setShowDropdown(prev => !prev)}
                >
                  <FaUserCircle style={{ marginRight: '6px' }} />
                  {user.role === 'admin' ? 'Admin' : 'My Account'}
                </span>

                {showDropdown && (
                  <div className="dropdown-menu">
                    {user.role === 'admin' ? (
                      <Link to="/admin" onClick={() => setShowDropdown(false)}>Dashboard</Link>
                    ) : (
                      <Link to="/profile" onClick={() => setShowDropdown(false)}>Profile</Link>
                    )}
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
