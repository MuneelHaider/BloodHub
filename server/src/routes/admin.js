// src/routes/admin.js
const express = require('express')
const User    = require('../models/User')
const { protect } = require('../middleware/auth')

const router = express.Router()

// only admins:
router.use(protect, (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' })
  }
  next()
})

// GET /api/admin/users
router.get('/users', async (req, res) => {
  const users = await User.find({ role: { $ne: 'admin' } }).select('-password')
  res.json(users)
})

// PUT /api/admin/users/:id/status
router.put('/users/:id/status', async (req, res) => {
  const { status } = req.body
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  ).select('-password')
  if (!user) return res.status(404).json({ message: 'User not found' })
  res.json(user)
})

// PUT /api/admin/users/:id/role
router.put('/users/:id/role', async (req, res) => {
  const { role } = req.body
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  ).select('-password')
  if (!user) return res.status(404).json({ message: 'User not found' })
  res.json(user)
})

module.exports = router
