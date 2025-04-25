import axios from 'axios'

const BASE = import.meta.env.VITE_API_URL
const API = `${BASE}/messages`

export const getChatWithUser = async (userId, token) => {
  return await axios.get(`${API}/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

export const sendMessageToUser = async (recipient, text, token) => {
  return await axios.post(`${API}`, { recipient, text }, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

export const getConversations = async (token) => {
    return await axios.get(`${BASE}/messages/conversations`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

export const startConversationWithUser = async (recipientId) => {
  const token = localStorage.getItem('token')
  return await axios.post(
    `${BASE}/messages/start/${recipientId}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  )
}

  