const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  bloodType: { type: String },
  location:  { type: String },
  phone:     { type: String },
  isDonor:   { type: Boolean, default: false },
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)
