import { format, formatDistanceToNow, parseISO } from 'date-fns'
import { Link } from 'react-router-dom'

const ConversationList = ({ 
  conversations, 
  selectedConversationId, 
  onSelectConversation,
  allUsers
}) => {
  // Helper to get user info by ID
  const getUserInfo = (userId) => {
    return allUsers.find(user => user.id === userId) || { name: 'Unknown User' }
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Conversations</h2>
      </div>
      
      {conversations.length === 0 ? (
        <div className="p-6 text-center">
          <p className="text-gray-500">No conversations yet</p>
          <p className="text-sm text-gray-400 mt-1">
            Find donors and start messaging them
          </p>
          <Link 
            to="/donors" 
            className="mt-4 inline-block text-sm text-primary-600 hover:text-primary-700"
          >
            Find Donors
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
          {conversations.map((conversation) => {
            const otherUser = getUserInfo(conversation.personId)
            const lastMessage = conversation.lastMessage
            
            return (
              <li 
                key={conversation.personId}
                className={`cursor-pointer hover:bg-gray-50 ${
                  selectedConversationId === conversation.personId 
                    ? 'bg-primary-50' 
                    : ''
                }`}
                onClick={() => onSelectConversation(conversation.personId)}
              >
                <div className="flex px-4 py-4">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-lg font-semibold">
                      {otherUser.name.charAt(0)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {otherUser.name}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {formatMessageTime(lastMessage.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {lastMessage.content}
                    </p>
                    {conversation.unreadCount > 0 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 mt-1">
                        {conversation.unreadCount} new
                      </span>
                    )}
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

// Helper function to format message timestamps
const formatMessageTime = (timestamp) => {
  const date = parseISO(timestamp)
  const now = new Date()
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))
  
  if (diffDays < 1) {
    return formatDistanceToNow(date, { addSuffix: true })
  } else if (diffDays < 7) {
    return format(date, 'EEEE')
  } else {
    return format(date, 'MMM d')
  }
}

export default ConversationList