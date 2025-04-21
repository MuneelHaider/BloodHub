import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaTint, FaCog, FaUsers, FaUsersCog } from 'react-icons/fa'

const AdminNavbar = () => {
  const { currentUser, logout } = useUser()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const navigate = useNavigate()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen)
  
  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navLinkClass = ({ isActive }) => 
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive 
        ? 'text-white bg-primary-700' 
        : 'text-gray-700 hover:bg-primary-50 hover:text-primary-700'
    }`

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/admin" className="flex items-center">
              <FaTint className="h-6 w-6 text-primary-600 mr-2" />
              <span className="text-2xl font-bold text-primary-700">Blood<span className="text-primary-600">Hub</span></span>
              <span className="ml-2 text-sm bg-primary-100 text-primary-800 px-2 py-0.5 rounded">Admin</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavLink to="/admin" end className={navLinkClass}>
              <span className="flex items-center">
                <FaCog className="mr-2" />
                Dashboard
              </span>
            </NavLink>
            <NavLink to="/admin/users" className={navLinkClass}>
              <span className="flex items-center">
                <FaUsers className="mr-2" />
                Users
              </span>
            </NavLink>
            <NavLink to="/admin/roles" className={navLinkClass}>
              <span className="flex items-center">
                <FaUsersCog className="mr-2" />
                Roles
              </span>
            </NavLink>
            <NavLink to="/admin/settings" className={navLinkClass}>
              <span className="flex items-center">
                <FaCog className="mr-2" />
                Settings
              </span>
            </NavLink>
          </div>

          {/* Profile Dropdown */}
          <div className="hidden md:flex md:items-center">
            <div className="relative ml-3">
              <button
                onClick={toggleProfile}
                className="flex items-center p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
              >
                <span className="mr-2 text-sm font-medium">{currentUser?.name}</span>
                <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                  {currentUser?.name?.charAt(0) || <FaUser />}
                </div>
              </button>
              
              {isProfileOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                  <Link
                    to="/"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <FaUser className="mr-2" />
                    View Site
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary-600 hover:text-primary-700 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/admin" end className={navLinkClass} onClick={toggleMenu}>Dashboard</NavLink>
            <div className="mt-1">
              <NavLink to="/admin/users" className={navLinkClass} onClick={toggleMenu}>Users</NavLink>
            </div>
            <div className="mt-1">
              <NavLink to="/admin/roles" className={navLinkClass} onClick={toggleMenu}>Roles</NavLink>
            </div>
            <div className="mt-1">
              <NavLink to="/admin/settings" className={navLinkClass} onClick={toggleMenu}>Settings</NavLink>
            </div>
          </div>
          
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white">
                {currentUser?.name?.charAt(0) || <FaUser />}
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{currentUser?.name}</div>
                <div className="text-sm font-medium text-gray-500">{currentUser?.email}</div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                onClick={toggleMenu}
              >
                View Site
              </Link>
              <button
                onClick={() => {
                  handleLogout()
                  toggleMenu()
                }}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default AdminNavbar