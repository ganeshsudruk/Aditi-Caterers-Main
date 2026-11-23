const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');

const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const validateMiddleware = require('../middleware/validateMiddleware');
const {
  publicBookingSubmissionValidator,
  updateBookingValidator,
  updateStatusValidator,
  addNoteValidator,
} = require('../validators/bookingValidator');

// Public booking request rate limiter to prevent spam
const publicBookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 20, // Limit each IP to 20 submissions
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many booking requests from this IP, please try again after 15 minutes.',
  },
});

// ================= PUBLIC ROUTES =================
// POST /api/v1/bookings or /api/v1/enquiries
router.post(
  '/',
  publicBookingLimiter,
  publicBookingSubmissionValidator,
  validateMiddleware,
  bookingController.submitBooking
);

module.exports = router;
