const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/auth');
const {
  getDashboardStats,
  getUsers,
  updateUser,
  deleteUser,
  getListings,
  updateListing,
  deleteListing,
  getReports,
  updateReport,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getMessages,
  replyToMessage,
  deleteMessage
} = require('../controllers/admin.controller');

// All routes require admin authentication
router.use(adminAuth);

// Dashboard
router.get('/stats', getDashboardStats);

// Users
router.get('/users', getUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Listings
router.get('/listings', getListings);
router.put('/listings/:id', updateListing);
router.delete('/listings/:id', deleteListing);

// Reports
router.get('/reports', getReports);
router.put('/reports/:id', updateReport);

// Categories
router.get('/categories', getCategories);
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

// Messages
router.get('/messages', getMessages);
router.post('/messages/:id/reply', replyToMessage);
router.delete('/messages/:id', deleteMessage);

module.exports = router;