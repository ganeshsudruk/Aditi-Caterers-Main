const { body, query } = require('express-validator');
const { ALLOWED_STATUS_LIST, SERVICE_TYPES } = require('../constants/bookingStatus');

const publicBookingSubmissionValidator = [
  body('customer')
    .optional()
    .isObject()
    .withMessage('Customer object must be provided'),

  // Accept top-level or customer.* fields
  body('customer.fullName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Full name must be between 2 and 100 characters'),
  body('customerName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 }),

  body('customer.phoneNumber')
    .optional()
    .trim()
    .matches(/^[0-9+ -]{10,15}$/)
    .withMessage('Please provide a valid phone number (at least 10 digits)'),
  body('mobile')
    .optional()
    .trim()
    .matches(/^[0-9+ -]{10,15}$/),

  body('customer.email')
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('email')
    .optional({ checkFalsy: true })
    .trim()
    .isEmail(),

  body('event.eventType')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Event type is required'),
  body('eventType')
    .optional()
    .trim()
    .notEmpty(),

  body('event.eventDate')
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate()
    .withMessage('Event date must be a valid ISO date'),
  body('eventDate')
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  body('event.guestCount')
    .optional()
    .isInt({ min: 1, max: 50000 })
    .withMessage('Guest count must be a positive integer'),
  body('guestCount')
    .optional()
    .isInt({ min: 1, max: 50000 }),

  body('customerMessage')
    .optional()
    .trim()
    .isLength({ max: 3000 })
    .withMessage('Message must not exceed 3000 characters'),
  body('message')
    .optional()
    .trim()
    .isLength({ max: 3000 }),
];

const updateBookingValidator = [
  body('status')
    .optional()
    .isIn(ALLOWED_STATUS_LIST)
    .withMessage(`Status must be one of: ${ALLOWED_STATUS_LIST.join(', ')}`),
  body('guestCount')
    .optional()
    .isInt({ min: 1, max: 50000 }),
  body('serviceType')
    .optional()
    .isIn(SERVICE_TYPES),
];

const updateStatusValidator = [
  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(ALLOWED_STATUS_LIST)
    .withMessage(`Status must be one of: ${ALLOWED_STATUS_LIST.join(', ')}`),
  body('note')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Status note cannot exceed 1000 characters'),
  body('reason')
    .optional()
    .trim()
    .isLength({ max: 1000 }),
];

const addNoteValidator = [
  body('note')
    .notEmpty()
    .withMessage('Note text is required')
    .trim()
    .isLength({ min: 1, max: 3000 })
    .withMessage('Note text must be between 1 and 3000 characters'),
];

const addCommunicationValidator = [
  body('summary')
    .notEmpty()
    .withMessage('Summary is required')
    .trim()
    .isLength({ max: 1000 }),
  body('channel')
    .optional()
    .trim(),
];

module.exports = {
  publicBookingSubmissionValidator,
  updateBookingValidator,
  updateStatusValidator,
  addNoteValidator,
  addCommunicationValidator,
};
