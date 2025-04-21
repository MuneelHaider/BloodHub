// src/routes/dashboard.js
const express      = require('express')
const Donor        = require('../models/Donor')
const Donation     = require('../models/Donation')
const Conversation = require('../models/Conversation')
const Message      = require('../models/Message')
const { protect }  = require('../middleware/auth')

const router = express.Router()

// GET /api/dashboard/stats
router.get('/stats', protect, async (req, res) => {
  try {
    const donor = await Donor.findOne({ userId: req.user._id })
    if (!donor) return res.status(404).json({ message: 'Donor profile not found' })

    const totalDonations = await Donation.countDocuments({ donorId: donor._id })

    const convos = await Conversation.find({ participants: req.user._id }).select('_id')
    const convoIds = convos.map(c => c._id)

    const unreadMessages = await Message.countDocuments({
      conversationId: { $in: convoIds },
      sender:         { $ne: req.user._id },
      read:           false
    })

    res.json({ totalDonations, unreadMessages })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
