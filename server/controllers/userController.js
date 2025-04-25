const User = require('../models/User')

// GET /api/profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile' })
  }
}

// PUT /api/profile
const updateProfile = async (req, res) => {
  try {
    const updates = req.body
    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true
    }).select('-password')

    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ message: 'Failed to update profile' })
  }
}

const getPublicUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password')
      if (!user || user.role === 'admin' || !user.isDonor) {
        return res.status(404).json({ message: 'Donor not found' })
      }
      res.status(200).json(user)
    } catch {
      res.status(500).json({ message: 'Failed to fetch user profile' })
    }
  }

module.exports = {
  getProfile,
  updateProfile,
  getPublicUserProfile
}
