import axios from 'axios'

const API = import.meta.env.VITE_API_URL

export const getLoggedInUser = () => {
  const token = localStorage.getItem('token')
  return axios.get(`${API}/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

export const updateLoggedInUser = (data) => {
  const token = localStorage.getItem('token')
  return axios.put(`${API}/profile`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

export const getUserById = (id) => {
  const token = localStorage.getItem('token')
  return axios.get(`${API}/admin/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

export const updateUserById = (id, data) => {
  const token = localStorage.getItem('token')
  return axios.put(`${API}/admin/users/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

export const getDonorById = async (id) => {
    return await axios.get(`${API}/users/${id}`)
  }