const express = require('express')
const Donation = require('../models/Donation')
const { protect } = require('../middleware/auth')
const router = express.Router()

// Create a donation record
router.post('/', protect, async (req, res) => {
  const { donorId, recipient, date, location, notes } = req.body
  const donation = await Donation.create({ donorId, recipient, date, location, notes })
  // also bump donor.donationCount and lastDonation
  await Donor.findByIdAndUpdate(donorId, {
    $inc: { donationCount: 1 },
    lastDonation: date
  })
  res.status(201).json(donation)
})

// Get all donations for current user’s donor profile
router.get('/', protect, async (req, res) => {
  // find donorId from req.user.id, then fetch
  const donor = await Donor.findOne({ userId: req.user._id })
  if (!donor) return res.status(404).json({ message: 'Donor profile not found' })
  const list = await Donation.find({ donorId: donor._id })
  res.json(list)
})

module.exports = router
