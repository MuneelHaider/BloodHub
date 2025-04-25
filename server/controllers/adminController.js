const User = require('../models/User')
const Donation = require('../models/Donation')

// GET /api/admin/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password')
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' })
  }
}

// PUT /api/admin/users/:id
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).select('-password')
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ message: 'Failed to update user' })
  }
}

// DELETE /api/admin/users/:id
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user' })
  }
}

// GET /api/admin/donations
const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate('donor', 'name')
      .populate('requester', 'name')
    res.status(200).json(donations)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch donations' })
  }
}

// PUT /api/admin/donations/:id
const updateDonation = async (req, res) => {
  try {
    const donation = await Donation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    if (!donation) return res.status(404).json({ message: 'Donation not found' })
    res.status(200).json(donation)
  } catch (err) {
    res.status(500).json({ message: 'Failed to update donation' })
  }
}

// DELETE /api/admin/donations/:id
const deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id)
    if (!donation) return res.status(404).json({ message: 'Donation not found' })
    res.status(200).json({ message: 'Donation deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete donation' })
  }
}

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
  getAllDonations,
  updateDonation,
  deleteDonation
}
