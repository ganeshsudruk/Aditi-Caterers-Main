const BOOKING_STATUSES = {
  NEW: 'new', // Public submission initial state / pending_review
  PENDING_REVIEW: 'pending_review',
  CONTACTED: 'contacted',
  QUOTATION_SENT: 'quotation_sent',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed', // or event_completed
  CANCELLED: 'cancelled',
};

const ALLOWED_STATUS_LIST = [
  'new',
  'pending_review',
  'contacted',
  'quotation_sent',
  'confirmed',
  'completed',
  'event_completed',
  'cancelled',
];

/**
 * Valid state transitions for bookings
 */
const VALID_TRANSITIONS = {
  new: ['contacted', 'quotation_sent', 'confirmed', 'cancelled'],
  pending_review: ['contacted', 'quotation_sent', 'confirmed', 'cancelled'],
  contacted: ['quotation_sent', 'confirmed', 'cancelled'],
  quotation_sent: ['confirmed', 'contacted', 'cancelled'],
  confirmed: ['completed', 'event_completed', 'cancelled'],
  completed: [], // terminal state
  event_completed: [], // terminal state
  cancelled: ['pending_review', 'contacted'], // reopening only with explicit review
};

const SERVICE_TYPES = ['with_material', 'without_material', 'with-material', 'without-material', 'need-guidance'];

const EVENT_TYPES = [
  'wedding',
  'engagement',
  'birthday',
  'reception',
  'religious',
  'corporate',
  'other',
  'Event',
];

module.exports = {
  BOOKING_STATUSES,
  ALLOWED_STATUS_LIST,
  VALID_TRANSITIONS,
  SERVICE_TYPES,
  EVENT_TYPES,
};
