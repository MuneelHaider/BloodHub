const Message = require('../models/Message')
const User = require('../models/User')

// POST /api/messages
const sendMessage = async (req, res) => {
  try {
    const { recipient, text } = req.body

    const message = await Message.create({
      sender: req.user.id,
      recipient,
      text
    })

    res.status(201).json(message)
  } catch (err) {
    console.error('sendMessage error:', err)
    res.status(500).json({ message: 'Failed to send message' })
  }
}

// GET /api/messages/:userId
const getMessages = async (req, res) => {
  try {
    const { userId } = req.params
    const userIdStr = req.user.id

    const messages = await Message.find({
      $or: [
        { sender: userIdStr, recipient: userId },
        { sender: userId, recipient: userIdStr }
      ]
    }).sort({ createdAt: 1 })

    res.status(200).json(messages)
  } catch (err) {
    console.error('getMessages error:', err)
    res.status(500).json({ message: 'Failed to retrieve messages' })
  }
}

// GET /api/messages/conversations
const getConversations = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id
    if (!userId) return res.status(401).json({ message: 'Invalid user in token' })

    const messages = await Message.find({
      $or: [{ sender: userId }, { recipient: userId }]
    }).populate('sender recipient', '_id name')

    const userMap = new Map()

    messages.forEach(msg => {
      const otherUser = msg.sender._id.toString() === userId
        ? msg.recipient
        : msg.sender

      if (!userMap.has(otherUser._id.toString())) {
        userMap.set(otherUser._id.toString(), {
          _id: otherUser._id,
          name: otherUser.name
        })
      }
    })

    const conversationList = Array.from(userMap.values())
    res.status(200).json(conversationList)
  } catch (err) {
    console.error('getConversations error:', err)
    res.status(500).json({ message: 'Failed to load conversations' })
  }
}

const startConversation = async (req, res) => {
    try {
      const senderId = req.user.id
      const recipientId = req.params.recipientId
  
      if (senderId === recipientId) {
        return res.status(400).json({ message: "You can't message yourself." })
      }
  
      const existing = await Message.findOne({
        $or: [
          { sender: senderId, recipient: recipientId },
          { sender: recipientId, recipient: senderId }
        ]
      })
  
      if (!existing) {
        await Message.create({
          sender: senderId,
          recipient: recipientId,
          text: 'Started a new conversation.'
        })
      }
  
      const user = await User.findById(recipientId).select('_id name')
      res.status(200).json(user)
    } catch (err) {
      console.error('startConversation error:', err)
      res.status(500).json({ message: 'Failed to start conversation' })
    }
  }
  

module.exports = {
  sendMessage,
  getMessages,
  getConversations,
  startConversation
}
