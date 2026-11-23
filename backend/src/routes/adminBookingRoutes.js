const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const validateMiddleware = require('../middleware/validateMiddleware');
const {
  updateBookingValidator,
  updateStatusValidator,
  addNoteValidator,
} = require('../validators/bookingValidator');

// Protect all admin booking routes
router.use(authMiddleware);

// 1. List bookings
router.get('/', roleMiddleware('superadmin', 'owner', 'admin', 'manager', 'staff'), bookingController.getAdminBookings);

// 2. Create manual booking
router.post('/', roleMiddleware('superadmin', 'owner', 'admin', 'manager'), bookingController.createManualBooking);

// 3. Get single booking details
router.get('/:bookingId', roleMiddleware('superadmin', 'owner', 'admin', 'manager', 'staff'), bookingController.getBookingById);

// 4. Update booking details
router.patch(
  '/:bookingId',
  roleMiddleware('superadmin', 'owner', 'admin', 'manager'),
  updateBookingValidator,
  validateMiddleware,
  bookingController.updateBookingDetails
);

// 5. Update booking status
router.patch(
  '/:bookingId/status',
  roleMiddleware('superadmin', 'owner', 'admin', 'manager'),
  updateStatusValidator,
  validateMiddleware,
  bookingController.updateBookingStatus
);

// 6. Add internal note
router.post(
  '/:bookingId/notes',
  roleMiddleware('superadmin', 'owner', 'admin', 'manager'),
  addNoteValidator,
  validateMiddleware,
  bookingController.addInternalNote
);

// 7. Archive booking
router.patch(
  '/:bookingId/archive',
  roleMiddleware('superadmin', 'owner', 'admin'),
  bookingController.archiveBooking
);

module.exports = router;
