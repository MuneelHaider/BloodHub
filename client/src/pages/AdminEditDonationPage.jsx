import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './AdminEditPage.css'
import { FaUser, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa'
import { fetchAllDonations, updateDonationById } from '../api/adminApi'

const AdminEditDonationPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    donor: '',
    requester: '',
    date: '',
    location: '',
    status: '',
    notes: ''
  })
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const res = await fetchAllDonations()
        const found = res.data.find(d => d._id === id)
        if (found) {
          setFormData({
            donor: found.donor?.name || '',
            requester: found.requester?.name || '',
            date: found.date,
            location: found.location,
            status: found.status,
            notes: found.notes || ''
          })
        } else {
          setError('Donation not found')
        }
      } catch {
        setError('Failed to load donation')
      }
    }
    fetchDonation()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateDonationById(id, formData)
      navigate('/admin')
    } catch {
      setError('Failed to update donation')
    }
  }

  if (error) return <div className="admin-edit">{error}</div>

  return (
    <div className="admin-edit">
      <h1>Edit Donation (Admin)</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Donor Name</label>
          <div className="input-wrapper">
            <FaUser />
            <input type="text" name="donor" value={formData.donor} onChange={handleChange} required />
          </div>
        </div>

        <div className="field">
          <label>Requester Name</label>
          <div className="input-wrapper">
            <FaUser />
            <input type="text" name="requester" value={formData.requester} onChange={handleChange} required />
          </div>
        </div>

        <div className="field">
          <label>Date</label>
          <div className="input-wrapper">
            <FaCalendarAlt />
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
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
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className="input" required>
            <option value="">Select status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="field">
          <label>Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="input"
            placeholder="Internal notes or remarks"
          />
        </div>

        <div className="actions">
          <button type="submit" className="btn-primary">Save Changes</button>
          <button type="button" className="btn-secondary" onClick={() => navigate('/admin')}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default AdminEditDonationPage
