import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './DonorDetailPage.css'

import { getDonorById } from '../api/userApi'
import { recordDonation } from '../api/donorApi'
import { startConversationWithUser } from '../api/messageApi'

const DonorDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [donor, setDonor] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDonor = async () => {
      try {
        const res = await getDonorById(id)
        setDonor(res.data)
      } catch {
        setError('Failed to load donor profile')
      } finally {
        setLoading(false)
      }
    }

    fetchDonor()
  }, [id])

  const handleStartChat = async () => {
    try {
      await startConversationWithUser(donor._id)
      navigate('/messages')
    } catch {
      alert('Failed to start conversation')
    }
  }

  const handleRecordDonation = async () => {
    try {
      await recordDonation(donor._id, donor.location)
      alert('Donation recorded successfully!')
    } catch {
      alert('Failed to record donation')
    }
  }

  if (loading) return <p>Loading donor information...</p>
  if (error || !donor) return <p>{error || 'Donor not found'}</p>

  return (
    <div className="donor-detail-wrapper">
      <div className="donor-detail">
        <Link to="/donors" className="btn-back">← Back to Donors</Link>
        <div className="card">
          <div className="info">
            <h2>{donor.name}</h2>
            <p>Blood Type: {donor.bloodType}</p>
            <p>Location: {donor.location}</p>
            <p>Phone: {donor.phone}</p>
            <p>Email: {donor.email}</p>
            <p>Donations: {donor.donationCount || 0}</p>
            <p>Last Donation: {donor.lastDonation || 'N/A'}</p>
            <p>Bio: {donor.bio || '—'}</p>
          </div>
          <div className="avatar-area">
            <div className="avatar">{donor.name.charAt(0)}</div>
            <div className="button-group">
              <button onClick={handleStartChat} className="btn-message">Message Donor</button>
              <button onClick={handleRecordDonation} className="btn-message">Donation Successful</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  
}

export default DonorDetailPage
