const express = require('express')
const router = express.Router()
const { getProfile, updateProfile, getPublicUserProfile } = require('../controllers/userController')
const { verifyToken } = require('../auth/jwt')
const { register, login, registerAdmin } = require('../controllers/accountController')

router.post('/register', register)
router.post('/login', login)
router.post('/register-admin', registerAdmin)
router.get('/:id', getPublicUserProfile)
router.get('/users/:id', getPublicUserProfile)

router.get('/profile', verifyToken, getProfile)
router.put('/profile', verifyToken, updateProfile)


module.exports = router
