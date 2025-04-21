import { createContext, useState, useContext, useEffect } from 'react'
import { useUser } from './UserContext'

// Mock message data
const mockMessages = [
  {
    id: '1',
    senderId: '2',
    receiverId: '1',
    content: 'Hello, I noticed you are a blood donor. I am in need of O+ blood for my father. Would you be available to donate?',
    timestamp: '2023-11-15T10:30:00',
    read: true
  },
  {
    id: '2',
    senderId: '1',
    receiverId: '2',
    content: 'Hi Jane, yes I would be happy to help. When and where would you need me to donate?',
    timestamp: '2023-11-15T10:45:00',
    read: true
  },
  {
    id: '3',
    senderId: '2',
    receiverId: '1',
    content: 'Thank you so much! My father is at Memorial Hospital. Could you come tomorrow around 2 PM?',
    timestamp: '2023-11-15T11:00:00',
    read: false
  },
  {
    id: '4',
    senderId: '3',
    receiverId: '1',
    content: 'Hi John, I saw that you are an O+ donor. My blood bank is running low on supplies. Would you be interested in donating this weekend?',
    timestamp: '2023-11-14T14:20:00',
    read: true
  }
]

const MessagesContext = createContext()

export const MessagesProvider = ({ children }) => {
  const { currentUser } = useUser()
  const [messages, setMessages] = useState([])
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch messages for current user
  useEffect(() => {
    if (currentUser) {
      // Simulate API call
      setTimeout(() => {
        const userMessages = mockMessages.filter(
          message => message.senderId === currentUser.id || message.receiverId === currentUser.id
        )
        setMessages(userMessages)
        
        // Generate conversations
        const userConversations = generateConversations(userMessages, currentUser.id)
        setConversations(userConversations)
        
        setLoading(false)
      }, 500)
    }
  }, [currentUser])

  // Helper to generate conversations from messages
  const generateConversations = (messages, currentUserId) => {
    const conversationsMap = new Map()
    
    messages.forEach(message => {
      // Determine the other person in the conversation
      const otherPersonId = message.senderId === currentUserId 
        ? message.receiverId 
        : message.senderId
      
      if (!conversationsMap.has(otherPersonId)) {
        conversationsMap.set(otherPersonId, {
          personId: otherPersonId,
          messages: [],
          lastMessage: null,
          unreadCount: 0
        })
      }
      
      const conversation = conversationsMap.get(otherPersonId)
      conversation.messages.push(message)
      
      // Update last message
      if (!conversation.lastMessage || new Date(message.timestamp) > new Date(conversation.lastMessage.timestamp)) {
        conversation.lastMessage = message
      }
      
      // Count unread messages
      if (message.receiverId === currentUserId && !message.read) {
        conversation.unreadCount += 1
      }
    })
    
    // Sort conversations by last message timestamp (newest first)
    return Array.from(conversationsMap.values()).sort((a, b) => 
      new Date(b.lastMessage.timestamp) - new Date(a.lastMessage.timestamp)
    )
  }

  // Send a new message
  const sendMessage = (receiverId, content) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newMessage = {
          id: (messages.length + 1).toString(),
          senderId: currentUser.id,
          receiverId,
          content,
          timestamp: new Date().toISOString(),
          read: false
        }
        
        setMessages(prevMessages => [...prevMessages, newMessage])
        
        // Update conversations
        const updatedMessages = [...messages, newMessage]
        const updatedConversations = generateConversations(updatedMessages, currentUser.id)
        setConversations(updatedConversations)
        
        resolve(newMessage)
      }, 300)
    })
  }

  // Mark messages as read
  const markAsRead = (messageIds) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setMessages(prevMessages => 
          prevMessages.map(message => 
            messageIds.includes(message.id) ? { ...message, read: true } : message
          )
        )
        
        // Update conversations
        const updatedConversations = generateConversations(
          messages.map(message => 
            messageIds.includes(message.id) ? { ...message, read: true } : message
          ),
          currentUser.id
        )
        
        setConversations(updatedConversations)
        resolve()
      }, 300)
    })
  }

  // Get messages for a specific conversation
  const getConversationMessages = (otherPersonId) => {
    return messages.filter(
      message => 
        (message.senderId === currentUser.id && message.receiverId === otherPersonId) ||
        (message.senderId === otherPersonId && message.receiverId === currentUser.id)
    ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
  }

  const value = {
    messages,
    conversations,
    loading,
    sendMessage,
    markAsRead,
    getConversationMessages
  }

  return <MessagesContext.Provider value={value}>{children}</MessagesContext.Provider>
}

export const useMessages = () => {
  const context = useContext(MessagesContext)
  if (!context) {
    throw new Error('useMessages must be used within a MessagesProvider')
  }
  return context
}