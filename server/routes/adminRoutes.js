const express = require('express')
const router = express.Router()
const {
  getAllUsers,
  updateUser,
  deleteUser,
  getAllDonations,
  updateDonation,
  deleteDonation
} = require('../controllers/adminController')
const { verifyToken } = require('../auth/jwt')
const checkAdmin = require('../auth/checkAdmin')

router.get('/users', verifyToken, checkAdmin, getAllUsers)
router.put('/users/:id', verifyToken, checkAdmin, updateUser)
router.delete('/users/:id', verifyToken, checkAdmin, deleteUser)

router.get('/donations', verifyToken, checkAdmin, getAllDonations)
router.put('/donations/:id', verifyToken, checkAdmin, updateDonation)
router.delete('/donations/:id', verifyToken, checkAdmin, deleteDonation)

module.exports = router
