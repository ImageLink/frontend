const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  createRequirement,
  updateRequirement,
  deleteRequirement,
  getRequirement,
  getRequirements,
  assignRequirement,
  completeRequirement
} = require('../controllers/requirement.controller');

// Public routes
router.get('/', getRequirements);
router.get('/:id', getRequirement);

// Protected routes
router.post('/', auth, createRequirement);
router.put('/:id', auth, updateRequirement);
router.delete('/:id', auth, deleteRequirement);
router.put('/:id/assign', auth, assignRequirement);
router.put('/:id/complete', auth, completeRequirement);

module.exports = router;