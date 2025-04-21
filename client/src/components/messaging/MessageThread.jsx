import { useRef, useEffect } from 'react'
import { format, parseISO } from 'date-fns'
import { FaPaperPlane } from 'react-icons/fa'

const MessageThread = ({ 
  messages, 
  selectedUser,
  currentUser,
  onSendMessage,
  newMessageText,
  setNewMessageText
}) => {
  const messagesEndRef = useRef(null)
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newMessageText.trim()) {
      onSendMessage(selectedUser.id, newMessageText)
      setNewMessageText('')
    }
  }

  if (!selectedUser) {
    return (
      <div className="bg-white rounded-lg shadow flex-1 flex flex-col items-center justify-center p-6">
        <div className="text-center">
          <h3 className="text-xl font-medium text-gray-900 mb-2">Select a conversation</h3>
          <p className="text-gray-500 max-w-md">
            Choose a conversation from the list or find a donor to start messaging
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow flex-1 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center">
        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-lg font-semibold mr-3">
          {selectedUser.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-lg font-medium text-gray-900">{selectedUser.name}</h2>
          <p className="text-sm text-gray-500">
            {selectedUser.bloodType && `Blood Type: ${selectedUser.bloodType}`}
          </p>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No messages yet</p>
              <p className="text-sm text-gray-400 mt-1">
                Start the conversation by sending a message
              </p>
            </div>
          ) : (
            messages.map((message, index) => {
              const isCurrentUser = message.senderId === currentUser.id
              
              return (
                <div 
                  key={message.id} 
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                      isCurrentUser 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-gray-200 text-gray-900'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p 
                      className={`text-xs mt-1 ${
                        isCurrentUser ? 'text-primary-100' : 'text-gray-500'
                      }`}
                    >
                      {format(parseISO(message.timestamp), 'h:mm a')}
                    </p>
                  </div>
                </div>
              )
            })
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Message input */}
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={newMessageText}
            onChange={(e) => setNewMessageText(e.target.value)}
            placeholder="Type your message..."
            className="input flex-1 rounded-r-none"
          />
          <button
            type="submit"
            disabled={!newMessageText.trim()}
            className="btn btn-primary rounded-l-none px-4 disabled:opacity-50"
          >
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  )
}

export default MessageThread