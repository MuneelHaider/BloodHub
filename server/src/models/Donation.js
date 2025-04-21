const mongoose = require('mongoose')

const donationSchema = new mongoose.Schema({
  donorId:    { type: mongoose.Schema.Types.ObjectId, ref: 'Donor', required: true },
  recipient:  { type: String },        // optional free‑text or ref to user
  date:       { type: Date, default: Date.now },
  location:   { type: String },
  notes:      { type: String },
}, { timestamps: true })

module.exports = mongoose.model('Donation', donationSchema)
