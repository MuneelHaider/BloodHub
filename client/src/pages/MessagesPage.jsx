import { useEffect, useRef, useState } from 'react'
import {
  getChatWithUser,
  sendMessageToUser,
  getConversations
} from '../api/messageApi'
import './MessagesPage.css'

const MessagesPage = () => {
  const token = localStorage.getItem('token')
  const currentUserId = JSON.parse(atob(token.split('.')[1])).id

  const [conversations, setConversations] = useState([])
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const chatEndRef = useRef(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const fetchMessages = async (userId) => {
    try {
      const res = await getChatWithUser(userId, token)
      setMessages(res.data)
    } catch {
      setMessages([])
    }
  }

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await getConversations(token)
        setConversations(res.data)
        if (res.data.length) {
          setSelectedUserId(res.data[0]._id)
          fetchMessages(res.data[0]._id)
        }
      } catch (err) {
        console.error('Failed to load conversations')
      }
    }

    fetchConversations()
  }, [])

  const handleSend = async () => {
    if (!input.trim() || !selectedUserId) return
    try {
      const res = await sendMessageToUser(selectedUserId, input, token)
      setMessages(prev => [...prev, res.data])
      setInput('')
    } catch (err) {
      console.error('Message send failed')
    }
  }

  const selectedUser = conversations.find(u => u._id === selectedUserId)

  return (
    <div className="messages-layout">
      <div className="sidebar">
        <h2>Chats</h2>
        {conversations.map(user => (
          <div
            key={user._id}
            className={`chat-item ${user._id === selectedUserId ? 'active' : ''}`}
            onClick={() => {
              setSelectedUserId(user._id)
              fetchMessages(user._id)
            }}
          >
            <div className="avatar">{user.name.charAt(0)}</div>
            <div>
              <strong>{user.name}</strong>
              <p className="preview">
                {user._id === selectedUserId && messages.length
                  ? messages[messages.length - 1]?.text.slice(0, 30)
                  : ''}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-window">
        <div className="chat-header">
          {selectedUser?.name || 'Select a conversation'}
        </div>

        <div className="chat-messages">
          {messages.map(msg => (
            <div
              key={msg._id}
              className={`msg ${msg.sender === currentUserId ? 'me' : 'them'}`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {selectedUser && (
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MessagesPage
