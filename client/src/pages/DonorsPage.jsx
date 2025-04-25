import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './DonorsPage.css'
import { getAllDonors } from '../api/donorApi'

const bloodTypes = ['All', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

const DonorsPage = () => {
  const [donors, setDonors] = useState([])
  const [search, setSearch] = useState('')
  const [bloodType, setBloodType] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await getAllDonors()
  
        console.log('GET /api/donations/donors response:', res.data)
  
        if (Array.isArray(res.data)) {
          setDonors(res.data)
        } else {
          console.error('Donor response is not an array:', res.data)
          setDonors([]) // fallback to empty array
        }
  
        setLoading(false)
      } catch (err) {
        setError('Failed to load donors')
        setDonors([]) // ensure fallback value
        setLoading(false)
      }
    }
  
    fetchDonors()
  }, [])
  

  const filtered = donors.filter(donor => {
    const matchesSearch = (donor.name?.toLowerCase() || '').includes(search.toLowerCase()) ||
      (donor.location?.toLowerCase() || '').includes(search.toLowerCase()) ||
      (donor.bloodType?.toLowerCase() || '').includes(search.toLowerCase())

    const matchesType = bloodType === 'All' || donor.bloodType === bloodType
    return matchesSearch && matchesType
  })

  return (
    <div className="donors-page-wrapper">
    <div className="donors-page">
      <h1>Find Blood Donors</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name, location or blood type"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn-search">Search</button>
      </div>

      <div className="blood-type-filters">
        {bloodTypes.map(type => (
          <button
            key={type}
            className={`filter-btn ${bloodType === type ? 'active' : ''}`}
            onClick={() => setBloodType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading donors...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : filtered.length === 0 ? (
        <p>No donors found.</p>
      ) : (
        <div className="donor-grid">
          {filtered.map(donor => (
            <div key={donor._id} className="donor-item">
              <div className="avatar">{donor.name.charAt(0)}</div>
              <div className="details">
                <h3>{donor.name}</h3>
                <p>Blood Type: {donor.bloodType}</p>
                <p>Location: {donor.location}</p>
                <p>Phone: {donor.phone}</p>
                <p>Email: {donor.email}</p>
                <Link to={`/donors/${donor._id}`} className="btn-view">View Profile</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  )
}

export default DonorsPage
