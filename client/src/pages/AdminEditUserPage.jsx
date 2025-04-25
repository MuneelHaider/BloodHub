import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './AdminEditPage.css'
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone, FaTint } from 'react-icons/fa'
import { fetchAllUsers, updateUserById } from '../api/adminApi'

const AdminEditUserPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', location: '',
    bloodType: '', isDonor: false, blocked: false
  })

  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetchAllUsers()
        const user = res.data.find(u => u._id === id)
        if (user) setFormData(user)
        else setError('User not found')
      } catch {
        setError('Failed to load user')
      }
    }
    fetchUser()
  }, [id])

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
      await updateUserById(id, formData)
      navigate('/admin')
    } catch {
      setError('Failed to update user')
    }
  }

  if (error) return <div className="admin-edit">{error}</div>

  return (
    <div className="admin-edit">
      <h1>Edit User (Admin)</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Full Name</label>
          <div className="input-wrapper">
            <FaUser />
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
        </div>

        <div className="field">
          <label>Email</label>
          <div className="input-wrapper">
            <FaEnvelope />
            <input type="email" name="email" value={formData.email} readOnly />
          </div>
        </div>

        <div className="field">
          <label>Phone</label>
          <div className="input-wrapper">
            <FaPhone />
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
        </div>

        <div className="field">
          <label>Location</label>
          <div className="input-wrapper">
            <FaMapMarkerAlt />
            <input type="text" name="location" value={formData.location} onChange={handleChange} required />
          </div>
        </div>

        <div className="field">
          <label>Blood Type</label>
          <div className="input-wrapper">
            <select name="bloodType" value={formData.bloodType} onChange={handleChange} required>
              <option value="">Select blood type</option>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="checkboxes">
          <label>
            <input
              type="checkbox"
              name="isDonor"
              checked={formData.isDonor}
              onChange={handleChange}
            />
            Registered Donor
          </label>

          <label>
            <input
              type="checkbox"
              name="blocked"
              checked={formData.blocked}
              onChange={handleChange}
            />
            Blocked
          </label>
        </div>

        <div className="actions">
          <button type="submit" className="btn-primary">Save Changes</button>
          <button type="button" className="btn-secondary" onClick={() => navigate('/admin')}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default AdminEditUserPage
