const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000

const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
const donationRoutes = require('./routes/donationRoutes')
const messageRoutes = require('./routes/messageRoutes')

app.use('/api', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/donations', donationRoutes)
app.use('/api/messages', messageRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch(err => console.error('MongoDB connection error:', err))
