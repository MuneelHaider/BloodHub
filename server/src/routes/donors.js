const express = require('express')
const Donor = require('../models/Donor')
const { protect } = require('../middleware/auth')

const router = express.Router()

// List & search
router.get('/', async (req, res) => {
  const { location, bloodType } = req.query
  const filter = {}
  if (location)  filter.location = new RegExp(location, 'i')
  if (bloodType) filter.bloodType = bloodType
  const donors = await Donor.find(filter)
  res.json(donors)
})

// Get one
router.get('/:id', async (req, res) => {
  const donor = await Donor.findById(req.params.id)
  if (!donor) return res.status(404).json({ message: 'Not found' })
  res.json(donor)
})

// Create (protected)
router.post('/', protect, async (req, res) => {
  const data = { ...req.body, userId: req.user._id }
  const donor = await Donor.create(data)
  res.status(201).json(donor)
})

// Update (protected)
router.put('/:id', protect, async (req, res) => {
  const updated = await Donor.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    { new: true }
  )
  if (!updated) return res.status(404).json({ message: 'Not found or unauthorized' })
  res.json(updated)
})

module.exports = router
