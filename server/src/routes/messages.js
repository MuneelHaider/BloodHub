const express      = require('express')
const Conversation = require('../models/Conversation')
const Message      = require('../models/Message')
const { protect }  = require('../middleware/auth')

const router = express.Router()

// GET /api/messages/conversations
// Returns [{ personId, lastMessage, unreadCount }, …]
router.get('/conversations', protect, async (req, res) => {
  try {
    const convos = await Conversation.find({ participants: req.user._id })
    const result = []

    for (let convo of convos) {
      // other participant in this convo
      const other = convo.participants.find(p => !p.equals(req.user._id))

      // most recent message
      const lastMessage = await Message
        .findOne({ conversationId: convo._id })
        .sort('-createdAt')
        .lean()

      // count unread for this user
      const unreadCount = await Message.countDocuments({
        conversationId: convo._id,
        sender:         { $ne: req.user._id },
        read:           false
      })

      result.push({ personId: other, lastMessage, unreadCount })
    }

    return res.json(result)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
})

// GET /api/messages/:conversationId
router.get('/:conversationId', protect, async (req, res) => {
  try {
    const msgs = await Message
      .find({ conversationId: req.params.conversationId })
      .sort('createdAt')
    return res.json(msgs)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
})

// POST /api/messages
router.post('/', protect, async (req, res) => {
  try {
    const { recipientId, text } = req.body

    // find or create the conversation
    let convo = await Conversation.findOne({
      participants: { $all: [req.user._id, recipientId] }
    })
    if (!convo) {
      convo = await Conversation.create({
        participants: [req.user._id, recipientId]
      })
    }

    const message = await Message.create({
      conversationId: convo._id,
      sender:         req.user._id,
      text
    })
    return res.status(201).json(message)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
})

// PATCH /api/messages/mark-read
router.patch('/mark-read', protect, async (req, res) => {
  try {
    const { messageIds } = req.body
    await Message.updateMany(
      { _id: { $in: messageIds } },
      { $set: { read: true } }
    )
    return res.json({ message: 'Marked as read' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
