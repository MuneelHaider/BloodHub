import { createContext, useState, useContext, useEffect } from 'react'

// Mock user data
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    bloodType: 'O+',
    location: 'New York, NY',
    phone: '(212) 555-1234',
    lastDonation: '2023-09-15',
    isDonor: true,
    role: 'user',
    status: 'active'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    bloodType: 'A-',
    location: 'Los Angeles, CA',
    phone: '(310) 555-5678',
    lastDonation: '2023-10-20',
    isDonor: true,
    role: 'user',
    status: 'active'
  },
  {
    id: 'admin',
    name: 'Admin User',
    email: 'admin@bloodhub.com',
    password: 'admin123',
    role: 'admin',
    status: 'active'
  }
]

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState(mockUsers)

  // Simulating checking for logged in user on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('bloodhub_user')
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  // Login function
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Simulate API request
      setTimeout(() => {
        const user = users.find(
          user => user.email === email && user.password === password && user.status !== 'blocked'
        )
        
        if (user) {
          // Don't store the password in the state/localStorage
          const { password, ...userWithoutPassword } = user
          setCurrentUser(userWithoutPassword)
          setIsAuthenticated(true)
          localStorage.setItem('bloodhub_user', JSON.stringify(userWithoutPassword))
          resolve(userWithoutPassword)
        } else {
          const blockedUser = users.find(
            user => user.email === email && user.status === 'blocked'
          )
          
          if (blockedUser) {
            reject(new Error('Your account has been blocked. Please contact support.'))
          } else {
            reject(new Error('Invalid email or password'))
          }
        }
      }, 500)
    })
  }

  // Register function
  const register = (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingUser = users.find(user => user.email === userData.email)
        
        if (existingUser) {
          reject(new Error('Email is already in use'))
          return
        }
        
        const newUser = {
          id: (users.length + 1).toString(),
          ...userData,
          role: 'user',
          status: 'active'
        }
        
        setUsers(prev => [...prev, newUser])
        
        const { password, ...userWithoutPassword } = newUser
        setCurrentUser(userWithoutPassword)
        setIsAuthenticated(true)
        localStorage.setItem('bloodhub_user', JSON.stringify(userWithoutPassword))
        
        resolve(userWithoutPassword)
      }, 500)
    })
  }

  // Logout function
  const logout = () => {
    setCurrentUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('bloodhub_user')
  }

  // Update user profile
  const updateProfile = (updatedData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedUser = { ...currentUser, ...updatedData }
        setCurrentUser(updatedUser)
        localStorage.setItem('bloodhub_user', JSON.stringify(updatedUser))
        
        setUsers(prev => 
          prev.map(user => 
            user.id === currentUser.id ? { ...user, ...updatedData } : user
          )
        )
        
        resolve(updatedUser)
      }, 500)
    })
  }

  // Admin functions
  const getAllUsers = () => {
    return users.filter(user => user.role !== 'admin')
  }

  const updateUserStatus = (userId, status) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setUsers(prev => 
          prev.map(user => 
            user.id === userId ? { ...user, status } : user
          )
        )
        resolve()
      }, 500)
    })
  }

  const updateUserRole = (userId, role) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setUsers(prev => 
          prev.map(user => 
            user.id === userId ? { ...user, role } : user
          )
        )
        resolve()
      }, 500)
    })
  }

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    updateProfile,
    getAllUsers,
    updateUserStatus,
    updateUserRole,
    users
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}