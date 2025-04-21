const mongoose = require('mongoose')

const donorSchema = new mongoose.Schema({
  userId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name:          { type: String, required: true },
  bloodType:     { type: String, required: true },
  location:      { type: String, required: true },
  phone:         { type: String, required: true },
  email:         { type: String, required: true },
  bio:           { type: String },
  profileImage:  { type: String },
  available:     { type: Boolean, default: true },
  lastDonation:  { type: Date },
  donationCount: { type: Number, default: 0 },
}, { timestamps: true })

module.exports = mongoose.model('Donor', donorSchema)
