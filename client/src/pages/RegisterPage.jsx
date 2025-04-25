import { useState } from 'react'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom'
import './RegisterPage.css'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    location: '',
    bloodType: '',
    isDonor: false
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const { data } = await axios.post('/register', formData)
      localStorage.setItem('token', data.token)
      window.dispatchEvent(new Event('authUpdated')) // trigger navbar to update
      navigate('/donors')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create Account</h2>
        {error && <div className="error-box">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
          <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
          <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
          <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
          <select name="bloodType" value={formData.bloodType} onChange={handleChange} required>
            <option value="">Select Blood Type</option>
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bt => (
              <option key={bt} value={bt}>{bt}</option>
            ))}
          </select>
          <label>
            <input type="checkbox" name="isDonor" checked={formData.isDonor} onChange={handleChange} />
            Register as donor
          </label>
          <button type="submit" className="btn-primary">Create Account</button>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
