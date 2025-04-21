import { useState, useEffect } from 'react'
import { useMessages } from '../contexts/MessagesContext'
import { useUser } from '../contexts/UserContext'
import { useDonors } from '../contexts/DonorsContext'
import ConversationList from '../components/messaging/ConversationList'
import MessageThread from '../components/messaging/MessageThread'
import { Link } from 'react-router-dom'
import { FaEnvelope } from 'react-icons/fa'

const MessagesPage = () => {
  const { currentUser } = useUser()
  const { donors } = useDonors()
  const { 
    conversations, 
    loading, 
    getConversationMessages,
    sendMessage,
    markAsRead
  } = useMessages()
  
  const [selectedConversationId, setSelectedConversationId] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessageText, setNewMessageText] = useState('')
  
  // Combine donors and other users for a full user list
  const [allUsers, setAllUsers] = useState([])
  
  // Set up all users
  useEffect(() => {
    if (!loading) {
      // In a real app, this would be fetched from the server
      // For now, we'll use the donors list as our user list
      setAllUsers(donors)
      
      // Set the first conversation as selected by default
      if (conversations.length > 0 && !selectedConversationId) {
        handleSelectConversation(conversations[0].personId)
      }
    }
  }, [loading, donors, conversations])
  
  const handleSelectConversation = (personId) => {
    setSelectedConversationId(personId)
    
    // Get messages for this conversation
    const conversationMessages = getConversationMessages(personId)
    setMessages(conversationMessages)
    
    // Mark unread messages as read
    const unreadMessages = conversationMessages
      .filter(msg => msg.receiverId === currentUser.id && !msg.read)
      .map(msg => msg.id)
    
    if (unreadMessages.length > 0) {
      markAsRead(unreadMessages)
    }
  }
  
  const handleSendMessage = (receiverId, content) => {
    sendMessage(receiverId, content)
      .then(newMessage => {
        setMessages(prevMessages => [...prevMessages, newMessage])
      })
  }
  
  const selectedUser = allUsers.find(user => user.id === selectedConversationId)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Messages</h1>
        <p className="text-gray-600">
          Communicate with blood donors and recipients. Coordinate donations and follow-ups.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center my-12">
          <div className="w-12 h-12 border-4 border-primary-600 rounded-full animate-spin border-t-transparent"></div>
        </div>
      ) : conversations.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaEnvelope className="h-8 w-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No messages yet</h2>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            You don't have any messages yet. Find donors and start a conversation with them.
          </p>
          <Link to="/donors" className="btn btn-primary py-2 px-6">
            Find Donors
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <ConversationList 
              conversations={conversations}
              selectedConversationId={selectedConversationId}
              onSelectConversation={handleSelectConversation}
              allUsers={allUsers}
            />
          </div>
          <div className="md:col-span-2">
            <MessageThread 
              messages={messages}
              selectedUser={selectedUser}
              currentUser={currentUser}
              onSendMessage={handleSendMessage}
              newMessageText={newMessageText}
              setNewMessageText={setNewMessageText}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default MessagesPage