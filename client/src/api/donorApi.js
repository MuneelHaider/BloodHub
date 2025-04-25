import axios from 'axios'

const API = import.meta.env.VITE_API_URL
const token = localStorage.getItem('token')
const headers = { Authorization: `Bearer ${token}` }

export const getAllDonors = async () => {
  return await axios.get(`${API}/donations/donors`)
}

export const getDonorById = async (id) => {
  return await axios.get(`${API}/users/${id}`, { headers })
}

export const recordDonation = async (donorId, location) => {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('User not authenticated')

  const decoded = JSON.parse(atob(token.split('.')[1]))
  const requesterId = decoded.id

  return await axios.post(`${API}/donations`, {
    donor: donorId,
    requester: requesterId,
    location,
    date: new Date().toISOString().split('T')[0],
    status: 'Completed',
    notes: 'Created from donor detail page'
  }, {
    headers: { Authorization: `Bearer ${token}` }
  })
}
