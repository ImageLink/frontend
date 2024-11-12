const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const {
  sendMessage,
  getMessages,
  getConversation,
  reportMessage,
  getMessageReports
} = require('../controllers/message.controller');

// Protected routes
router.post('/', auth, sendMessage);
router.get('/', auth, getMessages);
router.get('/conversation/:userId', auth, getConversation);
router.post('/:id/report', auth, reportMessage);

// Admin routes
router.get('/reports', adminAuth, getMessageReports);

module.exports = router;