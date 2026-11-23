const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const bookingService = require('../services/bookingService');

/**
 * Public: Submit booking enquiry
 * POST /api/v1/bookings or /api/v1/enquiries
 */
const submitBooking = asyncHandler(async (req, res) => {
  const clientInfo = {
    ipAddress: req.ip || req.connection?.remoteAddress || '',
    userAgent: req.get('user-agent') || '',
  };

  const result = await bookingService.submitPublicBooking(req.body, clientInfo);

  res.status(201).json(
    new ApiResponse(
      201,
      result,
      'Your booking request has been submitted. Our team will contact you after reviewing it.'
    )
  );
});

/**
 * Admin: Get paginated list of bookings
 * GET /api/v1/admin/bookings
 */
const getAdminBookings = asyncHandler(async (req, res) => {
  const result = await bookingService.getAdminBookings(req.query);
  res.status(200).json(
    new ApiResponse(200, result, 'Bookings retrieved successfully')
  );
});

/**
 * Admin: Get single booking details
 * GET /api/v1/admin/bookings/:bookingId
 */
const getBookingById = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const result = await bookingService.getBookingById(bookingId);
  res.status(200).json(
    new ApiResponse(200, result, 'Booking retrieved successfully')
  );
});

/**
 * Admin: Create manual booking
 * POST /api/v1/admin/bookings
 */
const createManualBooking = asyncHandler(async (req, res) => {
  const result = await bookingService.createManualBooking(req.body, req.user);
  res.status(201).json(
    new ApiResponse(201, result, 'Booking created successfully')
  );
});

/**
 * Admin: Update booking details
 * PATCH /api/v1/admin/bookings/:bookingId
 */
const updateBookingDetails = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const result = await bookingService.updateBookingDetails(bookingId, req.body, req.user);
  res.status(200).json(
    new ApiResponse(200, result, 'Booking details updated successfully')
  );
});

/**
 * Admin: Update booking status
 * PATCH /api/v1/admin/bookings/:bookingId/status
 */
const updateBookingStatus = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const { status, note, reason } = req.body;
  const result = await bookingService.updateBookingStatus(
    bookingId,
    status,
    note,
    reason,
    req.user
  );
  res.status(200).json(
    new ApiResponse(200, result, 'Booking status updated successfully')
  );
});

/**
 * Admin: Add internal note
 * POST /api/v1/admin/bookings/:bookingId/notes
 */
const addInternalNote = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const { note } = req.body;
  const result = await bookingService.addInternalNote(bookingId, note, req.user);
  res.status(201).json(
    new ApiResponse(201, result, 'Internal note added successfully')
  );
});

/**
 * Admin: Archive booking
 * PATCH /api/v1/admin/bookings/:bookingId/archive
 */
const archiveBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const result = await bookingService.archiveBooking(bookingId, req.user);
  res.status(200).json(
    new ApiResponse(200, result, 'Booking archived successfully')
  );
});

module.exports = {
  submitBooking,
  getAdminBookings,
  getBookingById,
  createManualBooking,
  updateBookingDetails,
  updateBookingStatus,
  addInternalNote,
  archiveBooking,
};
