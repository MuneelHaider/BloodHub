const express = require('express')
const router = express.Router()

const {
  createDonation,
  getMyDonations,
  updateMyDonation,
  deleteMyDonation,
  getAllDonors
} = require('../controllers/donationController')

const { verifyToken } = require('../auth/jwt')

router.get('/donors', getAllDonors)

router.post('/', verifyToken, createDonation)
router.get('/mine', verifyToken, getMyDonations)
router.put('/:id', verifyToken, updateMyDonation)
router.delete('/:id', verifyToken, deleteMyDonation)

module.exports = router
