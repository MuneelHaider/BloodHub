const express       = require('express')
const mongoose      = require('mongoose')
const dotenv        = require('dotenv')
const cookieParser  = require('cookie-parser')
const cors          = require('cors')

const authRoutes     = require('./routes/auth')
const donorRoutes    = require('./routes/donors')
const donationRoutes = require('./routes/donations')  // optional
const messageRoutes  = require('./routes/messages')
const dashboardRoutes= require('./routes/dashboard')
const adminRoutes    = require('./routes/admin')
const { protect }    = require('./middleware/auth')

dotenv.config()

const app = express()
app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err))

app.use('/api/auth',      authRoutes)
app.use('/api/donors',    donorRoutes)
app.use('/api/donations', donationRoutes)  // optional—for future donation‐records
app.use('/api/messages',  messageRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/admin',     adminRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
