import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './EditUserPage.css'
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone, FaTint } from 'react-icons/fa'
import {
  getLoggedInUser, updateLoggedInUser,
  getUserById, updateUserById
} from '../api/userApi'

const EditUserPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isAdmin = Boolean(id)

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', bloodType: '', location: '',
    blocked: false, role: 'user'
  })
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = isAdmin ? await getUserById(id) : await getLoggedInUser()
        setFormData(res.data)
      } catch {
        setMessage('Failed to load user data')
      }
    }
    fetchUser()
  }, [id, isAdmin])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isAdmin) {
        await updateUserById(id, formData)
      } else {
        await updateLoggedInUser(formData)
      }
      setMessage('User updated successfully')
      if (isAdmin) navigate('/admin')
    } catch {
      setMessage('Failed to update user')
    }
  }

  return (
    <div className="edit-user">
      <h1>{isAdmin ? 'Edit User' : 'Your Profile'}</h1>
      {message && <p className="message">{message}</p>}
      <form className="edit-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="name">Full Name</label>
            <div className="input-icon">
              <FaUser />
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <div className="input-icon">
              <FaEnvelope />
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                readOnly={!isAdmin}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="phone">Phone</label>
            <div className="input-icon">
              <FaPhone />
              <input
                type="text"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="bloodType">Blood Type</label>
            <div className="input-icon">
                <select
                name="bloodType"
                id="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
                required
                >
                <option value="">Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                </select>
            </div>
          </div>

          <div className="field">
            <label htmlFor="location">Location</label>
            <div className="input-icon">
              <FaMapMarkerAlt />
              <input
                type="text"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>

          {isAdmin && (
            <>
              <div className="checkbox">
                <input
                  type="checkbox"
                  name="blocked"
                  id="blocked"
                  checked={formData.blocked}
                  onChange={handleChange}
                />
                <label htmlFor="blocked">Blocked</label>
              </div>

              <div className="field">
                <label htmlFor="role">Role</label>
                <select
                  name="role"
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </>
          )}
        </div>

        <div className="actions">
          <button type="submit" className="btn-primary">Save Changes</button>
          <button type="button" className="btn-secondary" onClick={() => navigate(isAdmin ? '/admin' : '/')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditUserPage
