import axios from 'axios'

const BASE = import.meta.env.VITE_API_URL
const API = `${BASE}/admin`
const token = localStorage.getItem('token')
const headers = {
  Authorization: `Bearer ${token}`
}

// USERS
export const fetchAllUsers = () => {
  return axios.get(`${API}/users`, { headers })
}

export const updateUserById = (id, data) => {
  return axios.put(`${API}/users/${id}`, data, { headers })
}

export const deleteUserById = (id) => {
  return axios.delete(`${API}/users/${id}`, { headers })
}

// DONATIONS
export const fetchAllDonations = () => {
  return axios.get(`${API}/donations`, { headers })
}

export const updateDonationById = (id, data) => {
  return axios.put(`${API}/donations/${id}`, data, { headers })
}

export const deleteDonationById = (id) => {
  return axios.delete(`${API}/donations/${id}`, { headers })
}
