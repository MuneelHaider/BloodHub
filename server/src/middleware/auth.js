const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.protect = async (req, res, next) => {
  try {
    const token = req.cookies.token
    if (!token) return res.status(401).json({ message: 'Unauthorized' })
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id).select('-password')
    next()
  } catch {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
