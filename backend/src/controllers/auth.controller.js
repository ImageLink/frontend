const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendSMS } = require('../services/sms');
const { sendEmail } = require('../services/email');

// Store OTP codes temporarily (in production, use Redis or similar)
const otpStore = new Map();

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, phone, password, whatsapp, telegram } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [
        { email },
        { phone },
        { username }
      ]
    });

    if (existingUser) {
      return res.status(400).json({
        error: 'User already exists'
      });
    }

    // Generate OTP
    const otp = generateOTP();
    otpStore.set(phone, {
      otp,
      expires: Date.now() + 10 * 60 * 1000, // 10 minutes
      attempts: 0,
      userData: {
        username,
        email,
        phone,
        password,
        whatsapp,
        telegram
      }
    });

    // Send OTP via SMS using Twilio
    try {
      await sendSMS(
        phone,
        `Your PostMarket verification code is: ${otp}. Valid for 10 minutes.`
      );

      res.status(200).json({
        message: 'OTP sent successfully',
        phone
      });
    } catch (smsError) {
      console.error('SMS sending failed:', smsError);
      res.status(500).json({
        error: 'Failed to send OTP',
        details: 'SMS service error'
      });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      error: 'Registration failed',
      details: error.message
    });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const storedData = otpStore.get(phone);

    if (!storedData) {
      return res.status(400).json({
        error: 'No OTP request found',
        message: 'Please request a new OTP'
      });
    }

    if (Date.now() > storedData.expires) {
      otpStore.delete(phone);
      return res.status(400).json({
        error: 'OTP expired',
        message: 'Please request a new OTP'
      });
    }

    if (storedData.attempts >= 3) {
      otpStore.delete(phone);
      return res.status(400).json({
        error: 'Too many attempts',
        message: 'Please request a new OTP'
      });
    }

    storedData.attempts++;

    if (storedData.otp !== otp) {
      return res.status(400).json({
        error: 'Invalid OTP',
        attemptsLeft: 3 - storedData.attempts
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(storedData.userData.password, 12);

    // Create user
    const user = await User.create({
      ...storedData.userData,
      password: hashedPassword,
      role: 'user',
      status: 'active'
    });

    // Create JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Clean up OTP store
    otpStore.delete(phone);

    // Send welcome email
    await sendEmail({
      to: storedData.userData.email,
      subject: 'Welcome to PostMarket',
      html: `
        <h1>Welcome to PostMarket!</h1>
        <p>Your account has been successfully created.</p>
        <p>You can now start exploring guest posting opportunities or list your website.</p>
      `
    });

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({
      error: 'Verification failed',
      details: error.message
    });
  }
};

exports.resendOTP = async (req, res) => {
  try {
    const { phone } = req.body;
    const storedData = otpStore.get(phone);

    if (!storedData) {
      return res.status(400).json({
        error: 'No pending registration found'
      });
    }

    // Generate new OTP
    const otp = generateOTP();
    
    // Update stored data with new OTP and reset attempts
    otpStore.set(phone, {
      ...storedData,
      otp,
      expires: Date.now() + 10 * 60 * 1000,
      attempts: 0
    });

    // Send new OTP via SMS
    await sendSMS(
      phone,
      `Your new PostMarket verification code is: ${otp}. Valid for 10 minutes.`
    );

    res.status(200).json({
      message: 'New OTP sent successfully',
      phone
    });
  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({
      error: 'Failed to resend OTP',
      details: error.message
    });
  }
};