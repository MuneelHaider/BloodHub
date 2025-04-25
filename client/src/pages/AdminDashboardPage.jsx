import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './AdminDashboardPage.css'
import {
  fetchAllUsers,
  updateUserById,
  deleteUserById,
  fetchAllDonations,
  updateDonationById,
  deleteDonationById
} from '../api/adminApi'


const AdminDashboardPage = () => {
  const [users, setUsers] = useState([])
  const [donations, setDonations] = useState([])

  const [userQuery, setUserQuery] = useState('')
  const [donationQuery, setDonationQuery] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const loadData = async () => {
      try {
        const userRes = await fetchAllUsers()
        const donationRes = await fetchAllDonations()
        setUsers(userRes.data.filter(u => u.role !== 'admin'))
        setDonations(donationRes.data)
      } catch {
        setError('Failed to load data')
      }
    }

    loadData()
  }, [])

  const filteredUsers = users.filter(user =>
    `${user.name} ${user.email} ${user.phone} ${user.blocked ? 'blocked' : 'active'}`
      .toLowerCase()
      .includes(userQuery.toLowerCase())
  )

  const filteredDonations = donations.filter(d =>
    `${d.donor?.name} ${d.requester?.name} ${d.location} ${d.date} ${d.status}`
      .toLowerCase()
      .includes(donationQuery.toLowerCase())
  )

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      {error && <p className="error">{error}</p>}

      <section>
        <h2>Users</h2>
        <input
          type="text"
          placeholder="Search by name, email, phone, or status"
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          className="search-bar"
        />
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.blocked ? 'Blocked' : 'Active'}</td>
                <td>
                  <Link to={`/admin/users/${user._id}/edit`}><button>Edit</button></Link>
                  {/* Block/Delete actions handled elsewhere */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Donations</h2>
        <input
          type="text"
          placeholder="Search by donor, requester, date, location, or status"
          value={donationQuery}
          onChange={(e) => setDonationQuery(e.target.value)}
          className="search-bar"
        />
        <table className="admin-table">
          <thead>
            <tr>
              <th>Donor</th>
              <th>Requester</th>
              <th>Date</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonations.map(d => (
              <tr key={d._id}>
                <td>{d.donor?.name}</td>
                <td>{d.requester?.name}</td>
                <td>{d.date}</td>
                <td>{d.location}</td>
                <td>{d.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default AdminDashboardPage
