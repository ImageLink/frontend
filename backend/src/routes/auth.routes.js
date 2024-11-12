const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { register, login, verifyOTP, resendOTP } = require('../controllers/auth.controller');

// Validation middleware
const registerValidation = [
  body('username').trim().isLength({ min: 3 }).escape(),
  body('email').isEmail().normalizeEmail(),
  body('phone').matches(/^\+?[\d\s-]+$/).withMessage('Invalid phone number'),
  body('password').isLength({ min: 6 }),
  body('whatsapp').optional().matches(/^\+?[\d\s-]+$/),
  body('telegram').optional()
];

router.post('/register', registerValidation, register);
router.post('/login', login);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);

module.exports = router;