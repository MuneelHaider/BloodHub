const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = express.Router()

// Register
router.post('/register', async (req, res) => {
  const { name,email,password,bloodType,location,phone,isDonor } = req.body
  const existing = await User.findOne({ email })
  if (existing) return res.status(400).json({ message: 'Email in use' })

  const hash = await bcrypt.hash(password, 10)
  const user = await User.create({ name,email,password:hash,bloodType,location,phone,isDonor })

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
  res.cookie('token', token, { httpOnly: true, maxAge: 1000*60*60*24*7 })
  res.status(201).json({ user: { id:user._id,name:user.name,email:user.email } })
})

// Login
router.post('/login', async (req, res) => {
  const { email,password } = req.body
  const user = await User.findOne({ email })
  if (!user) return res.status(400).json({ message: 'Invalid credentials' })
  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.status(400).json({ message: 'Invalid credentials' })

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
  res.cookie('token', token, { httpOnly: true, maxAge: 1000*60*60*24*7 })
  res.json({ user: { id:user._id,name:user.name,email:user.email } })
})

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('token')
  res.json({ message: 'Logged out' })
})

// Get current user
const { protect } = require('../middleware/auth')
router.get('/me', protect, (req, res) => {
  res.json({ user: req.user })
})

// Update profile
router.put('/me', protect, async (req, res) => {
    const updates = (({ name,email,location,phone,bloodType,isDonor }) => 
                     ({ name,email,location,phone,bloodType,isDonor }))(req.body)
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true })
    res.json({ user })
  })  

module.exports = router
