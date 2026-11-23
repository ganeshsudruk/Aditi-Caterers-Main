const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');

const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const validateMiddleware = require('../middleware/validateMiddleware');
const {
  loginValidator,
  changePasswordValidator,
} = require('../validators/authValidator');

// Strict rate limiter for login requests to prevent brute force
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts from this IP, please try again after 15 minutes.',
  },
});

// Strict rate limiter for password change
const passwordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many password change requests, please try again after 15 minutes.',
  },
});

// 1. Admin Login
router.post('/login', loginLimiter, loginValidator, validateMiddleware, authController.login);

// 2. Current Admin Profile (Protected)
router.get('/me', authMiddleware, authController.getMe);

// 3. Change Password (Protected)
router.patch(
  '/change-password',
  authMiddleware,
  passwordLimiter,
  changePasswordValidator,
  validateMiddleware,
  authController.changePassword
);

// 4. Admin Logout (Protected / Permissive)
router.post('/logout', authMiddleware, authController.logout);

module.exports = router;
