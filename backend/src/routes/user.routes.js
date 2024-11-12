const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  getProfile,
  updateProfile,
  getDashboard,
  getNotifications,
  markNotificationRead,
  getStats
} = require('../controllers/user.controller');

// All routes require authentication
router.use(auth);

// Profile routes
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

// Dashboard routes
router.get('/dashboard', getDashboard);
router.get('/stats', getStats);

// Notification routes
router.get('/notifications', getNotifications);
router.put('/notifications/:id/read', markNotificationRead);

module.exports = router;