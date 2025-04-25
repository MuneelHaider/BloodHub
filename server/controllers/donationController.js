const Donation = require('../models/Donation')
const User = require('../models/User')

// POST /api/donations
const createDonation = async (req, res) => {
  try {
    const donation = await Donation.create({
      donor: req.body.donor || req.user.id,
      requester: req.body.requester,
      date: req.body.date,
      location: req.body.location,
      status: req.body.status,
      notes: req.body.notes
    })
    
    res.status(201).json(donation)
  } catch (err) {
    res.status(500).json({ message: 'Failed to create donation' })
  }
}

// GET /api/donations/mine
const getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ donor: req.user.id })
    res.status(200).json(donations)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch donations' })
  }
}

// PUT /api/donations/:id
const updateMyDonation = async (req, res) => {
  try {
    const donation = await Donation.findOneAndUpdate(
      { _id: req.params.id, donor: req.user.id },
      req.body,
      { new: true, runValidators: true }
    )
    if (!donation) return res.status(404).json({ message: 'Donation not found or unauthorized' })
    res.status(200).json(donation)
  } catch (err) {
    res.status(500).json({ message: 'Failed to update donation' })
  }
}

// DELETE /api/donations/:id
const deleteMyDonation = async (req, res) => {
  try {
    const donation = await Donation.findOneAndDelete({
      _id: req.params.id,
      donor: req.user.id
    })
    if (!donation) return res.status(404).json({ message: 'Donation not found or unauthorized' })
    res.status(200).json({ message: 'Donation deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete donation' })
  }
}

// GET /api/donations/donors
const getAllDonors = async (req, res) => {
    try {
      const donors = await User.find({ isDonor: true })
        .select('-password')
      res.status(200).json(donors)
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch donors' })
    }
  }
  

module.exports = {
  createDonation,
  getMyDonations,
  updateMyDonation,
  deleteMyDonation,
  getAllDonors
}
