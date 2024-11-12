const express = require('express');
const router = express.Router();
const { register } = require('../services/metrics');
const { adminAuth } = require('../middleware/auth');

// Metrics endpoint (protected, admin only)
router.get('/metrics', adminAuth, async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;