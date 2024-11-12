const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const {
  createListing,
  updateListing,
  deleteListing,
  getListing,
  getListings,
  approveListing,
  rejectListing
} = require('../controllers/listing.controller');

// Public routes
router.get('/', getListings);
router.get('/:id', getListing);

// Protected routes
router.post('/', auth, createListing);
router.put('/:id', auth, updateListing);
router.delete('/:id', auth, deleteListing);

// Admin routes
router.put('/:id/approve', adminAuth, approveListing);
router.put('/:id/reject', adminAuth, rejectListing);

module.exports = router;