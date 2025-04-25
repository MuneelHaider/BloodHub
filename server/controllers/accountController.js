const User = require('../models/User')
const bcrypt = require('bcrypt')
const { signToken } = require('../auth/jwt')

const register = async (req, res) => {
  try {
    const { name, email, password, phone, location, bloodType, isDonor } = req.body

    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      phone,
      location,
      bloodType,
      isDonor,
      password: hashedPassword
    })

    const token = signToken({ id: user._id, role: user.role })
    res.status(201).json({ token })
  } catch (err) {
    console.error('Registration error:', err)
    res.status(500).json({ message: 'Registration failed' })
  }
}

const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, phone, location, bloodType } = req.body

    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const admin = await User.create({
      name,
      email,
      phone,
      location,
      bloodType,
      isDonor: false,
      role: 'admin',
      password: hashedPassword
    })

    const token = signToken({ id: admin._id, role: admin.role })
    res.status(201).json({ token })
  } catch (err) {
    console.error('Admin registration error:', err)
    res.status(500).json({ message: 'Admin registration failed' })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = signToken({ id: user._id, role: user.role })
    res.status(200).json({ token })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ message: 'Login failed' })
  }
}

module.exports = {
  register,
  registerAdmin,
  login
}
