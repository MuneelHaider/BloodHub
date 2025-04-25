const express = require('express')
const router = express.Router()
const {
  sendMessage,
  getMessages,
  getConversations,
  startConversation
} = require('../controllers/messageController')
const { verifyToken } = require('../auth/jwt')

router.post('/', verifyToken, sendMessage)
router.post('/start/:recipientId', verifyToken, startConversation)
router.get('/conversations', verifyToken, getConversations)
router.get('/:userId', verifyToken, getMessages)

module.exports = router
