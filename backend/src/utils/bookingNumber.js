const Booking = require('../models/Booking');

/**
 * Generate unique human-readable booking number
 * Format: AC-BKG-YYYY-XXXXX (e.g. AC-BKG-2026-00001)
 * @returns {Promise<string>}
 */
const generateBookingNumber = async () => {
  const currentYear = new Date().getFullYear();
  const prefix = `AC-BKG-${currentYear}-`;

  // Find the latest booking created this year to safely increment
  const latestBooking = await Booking.findOne({
    bookingNumber: { $regex: `^${prefix}` },
  })
    .sort({ createdAt: -1 })
    .select('bookingNumber')
    .lean();

  let nextSequence = 1;

  if (latestBooking && latestBooking.bookingNumber) {
    const parts = latestBooking.bookingNumber.split('-');
    const lastSeq = parseInt(parts[parts.length - 1], 10);
    if (!isNaN(lastSeq)) {
      nextSequence = lastSeq + 1;
    }
  }

  // Pad to 5 digits
  let candidate = `${prefix}${String(nextSequence).padStart(5, '0')}`;

  // Collision safety loop
  let isUnique = false;
  let attempts = 0;
  while (!isUnique && attempts < 10) {
    const existing = await Booking.findOne({
      $or: [{ bookingNumber: candidate }, { bookingReference: candidate }],
    }).select('_id').lean();

    if (!existing) {
      isUnique = true;
    } else {
      nextSequence += 1;
      candidate = `${prefix}${String(nextSequence).padStart(5, '0')}`;
      attempts += 1;
    }
  }

  return candidate;
};

module.exports = {
  generateBookingNumber,
};
