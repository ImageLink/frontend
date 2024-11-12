const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const listingRoutes = require('./listing.routes');
const messageRoutes = require('./message.routes');
const requirementRoutes = require('./requirement.routes');
const adminRoutes = require('./admin.routes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/listings', listingRoutes);
router.use('/messages', messageRoutes);
router.use('/requirements', requirementRoutes);
router.use('/admin', adminRoutes);

module.exports = router;