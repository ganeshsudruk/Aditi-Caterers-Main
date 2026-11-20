import api from './api';

export const BOOKING_STATUSES = {
  pending_review: {
    id: 'pending_review',
    aliases: ['new', 'pending_review'],
    label: { en: 'Pending Review', mr: 'पुनरावलोकन बाकी' },
    badgeClass: 'bg-warning-subtle text-warning-emphasis border border-warning',
    icon: 'bi-hourglass-split',
  },
  contacted: {
    id: 'contacted',
    aliases: ['contacted'],
    label: { en: 'Contacted', mr: 'संपर्क साधला' },
    badgeClass: 'bg-info-subtle text-info-emphasis border border-info',
    icon: 'bi-telephone-fill',
  },
  quotation_sent: {
    id: 'quotation_sent',
    aliases: ['quotation_sent', 'quotation-sent'],
    label: { en: 'Quotation Sent', mr: 'कोटेशन पाठवले' },
    badgeClass: 'bg-primary-subtle text-primary-emphasis border border-primary',
    icon: 'bi-file-earmark-text-fill',
  },
  confirmed: {
    id: 'confirmed',
    aliases: ['confirmed'],
    label: { en: 'Confirmed', mr: 'निश्चित केले (Confirmed)' },
    badgeClass: 'bg-success-subtle text-success-emphasis border border-success',
    icon: 'bi-check-circle-fill',
  },
  completed: {
    id: 'completed',
    aliases: ['completed', 'event_completed'],
    label: { en: 'Event Completed', mr: 'कार्यक्रम पूर्ण' },
    badgeClass: 'bg-secondary-subtle text-secondary-emphasis border border-secondary',
    icon: 'bi-calendar-check-fill',
  },
  cancelled: {
    id: 'cancelled',
    aliases: ['cancelled'],
    label: { en: 'Cancelled', mr: 'रद्द केले' },
    badgeClass: 'bg-danger-subtle text-danger-emphasis border border-danger',
    icon: 'bi-x-circle-fill',
  },
};

const STORAGE_KEY_BOOKINGS = 'aditi_admin_bookings';

/**
 * Standardize status string to one of the 6 core keys
 */
export function normalizeStatus(rawStatus) {
  if (!rawStatus) return 'pending_review';
  const clean = rawStatus.toLowerCase().replace('-', '_');
  if (clean === 'new') return 'pending_review';
  if (clean === 'event_completed') return 'completed';
  if (BOOKING_STATUSES[clean]) return clean;
  return 'pending_review';
}

/**
 * Load all bookings from localStorage, syncing initial records from website enquiries
 */
export function getAllBookingsFromStorage() {
  try {
    let bookings = JSON.parse(localStorage.getItem(STORAGE_KEY_BOOKINGS) || '[]');

    // If bookings storage is empty, initialize and seed from existing public submissions
    if (!bookings || bookings.length === 0) {
      const contactEnquiries = JSON.parse(
        localStorage.getItem('aditi_contact_enquiries') || '[]'
      );
      const bookingEnquiries = JSON.parse(
        localStorage.getItem('aditi_enquiries') || '[]'
      );

      const combined = [...bookingEnquiries, ...contactEnquiries];
      const seeded = combined.map((item, index) => {
        const id = item.enquiryNumber || `AC-BKG-${new Date().getFullYear()}-${1001 + index}`;
        const normalizedSt = normalizeStatus(item.status);

        return {
          id,
          bookingNumber: id,
          source: item.enquiryNumber ? 'Website Enquiry' : 'Manual',
          status: normalizedSt,
          customer: {
            name: item.fullName || item.customerName || 'Anonymous Customer',
            mobile: item.mobile || '',
            email: item.email || '',
            preferredContactMethod: item.preferredContactMethod || 'phone',
          },
          event: {
            type: item.eventType || 'Event',
            otherType: item.otherEventType || '',
            date: item.dateNotDecided ? '' : item.eventDate || '',
            dateNotDecided: !!item.dateNotDecided,
            timeSlot: item.eventTime || item.mealType || 'Not specified',
            guestCount: parseInt(item.guestCount || 100, 10),
            venueName: item.venueAddress || '',
            venueAddress: item.venueAddress || '',
            city: item.eventCity || item.city || 'Maharashtra',
            notes: item.message || item.additionalNotes || '',
          },
          catering: {
            type: item.cateringType || 'with-material',
            packageId: item.package || '',
            selectedDishes: item.selectedDishes || '',
            specialDietary: item.specialDietary || '',
            budgetRange: item.budgetRange || item.budget || '',
          },
          quotation: {
            status: normalizedSt === 'quotation_sent' || normalizedSt === 'confirmed' ? 'Sent' : 'Not Prepared',
            referenceNumber: normalizedSt === 'quotation_sent' || normalizedSt === 'confirmed' ? `QT-${id}` : '',
            amount: normalizedSt === 'confirmed' ? 75000 : 0,
            sentAt: normalizedSt === 'quotation_sent' || normalizedSt === 'confirmed' ? item.submittedAt : null,
            validUntil: null,
            remarks: '',
          },
          internalNotes: item.internalNotes
            ? [
                {
                  id: 'n-1',
                  message: item.internalNotes,
                  author: 'Administrator',
                  createdAt: item.submittedAt || new Date().toISOString(),
                },
              ]
            : [],
          communicationLogs: [
            {
              id: 'c-1',
              channel: 'Website Form',
              summary: 'Customer submitted initial catering request on website.',
              author: 'System',
              createdAt: item.submittedAt || new Date().toISOString(),
            },
          ],
          auditHistory: [
            {
              id: 'a-1',
              action: 'Record Created',
              status: normalizedSt,
              changedBy: 'Customer (Website)',
              createdAt: item.submittedAt || new Date().toISOString(),
            },
          ],
          createdAt: item.submittedAt || new Date().toISOString(),
          updatedAt: item.submittedAt || new Date().toISOString(),
        };
      });

      if (seeded.length > 0) {
        localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(seeded));
        bookings = seeded;
      }
    }

    return bookings;
  } catch {
    return [];
  }
}

/**
 * Save array of bookings back to storage
 */
export function saveBookingsToStorage(bookings) {
  try {
    localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
    return true;
  } catch {
    return false;
  }
}

/**
 * Fetch filtered, sorted, paginated bookings
 */
export async function fetchAdminBookings(params = {}) {
  const {
    search = '',
    status = 'all',
    eventType = 'all',
    cateringType = 'all',
    sortBy = 'date_desc',
    page = 1,
    limit = 10,
  } = params;

  // 1. Try backend API first
  try {
    const res = await api.get('/admin/bookings', { params });
    if (res?.data?.success && res.data.data) {
      return res.data.data;
    }
  } catch {
    // API not live or route unmounted; fall back to local storage
  }

  // 2. Local Storage Implementation
  let records = getAllBookingsFromStorage();

  // Search filter
  if (search.trim()) {
    const q = search.trim().toLowerCase();
    records = records.filter(
      (b) =>
        (b.id && b.id.toLowerCase().includes(q)) ||
        (b.customer?.name && b.customer.name.toLowerCase().includes(q)) ||
        (b.customer?.mobile && b.customer.mobile.includes(q)) ||
        (b.event?.city && b.event.city.toLowerCase().includes(q))
    );
  }

  // Status filter
  if (status && status !== 'all') {
    records = records.filter((b) => b.status === status);
  }

  // Event Type filter
  if (eventType && eventType !== 'all') {
    records = records.filter(
      (b) => b.event?.type?.toLowerCase() === eventType.toLowerCase()
    );
  }

  // Catering Type filter
  if (cateringType && cateringType !== 'all') {
    records = records.filter((b) => b.catering?.type === cateringType);
  }

  // Sorting
  records.sort((a, b) => {
    if (sortBy === 'date_asc') {
      return new Date(a.event?.date || '9999-12-31') - new Date(b.event?.date || '9999-12-31');
    }
    if (sortBy === 'date_desc') {
      return new Date(b.event?.date || '0000-01-01') - new Date(a.event?.date || '0000-01-01');
    }
    if (sortBy === 'created_asc') {
      return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
    }
    if (sortBy === 'customer_asc') {
      return (a.customer?.name || '').localeCompare(b.customer?.name || '');
    }
    // Default: created_desc
    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  });

  const total = records.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * limit;
  const paginatedItems = records.slice(startIndex, startIndex + limit);

  return {
    items: paginatedItems,
    pagination: {
      total,
      page: currentPage,
      limit,
      totalPages,
    },
  };
}

/**
 * Fetch single booking details by ID
 */
export async function fetchBookingById(id) {
  try {
    const res = await api.get(`/admin/bookings/${id}`);
    if (res?.data?.success && res.data.data) {
      return res.data.data;
    }
  } catch {
    // Fall back to local storage
  }

  const list = getAllBookingsFromStorage();
  const found = list.find((b) => b.id === id || b.bookingNumber === id);
  if (!found) {
    throw new Error(`Booking ${id} not found.`);
  }
  return found;
}

/**
 * Create a new manual booking
 */
export async function createManualBooking(formData, adminName = 'Administrator') {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const id = `AC-BKG-${year}-${randomNum}`;
  const now = new Date().toISOString();

  const newBooking = {
    id,
    bookingNumber: id,
    source: 'Admin Created',
    status: formData.status || 'pending_review',
    customer: {
      name: formData.customerName.trim(),
      mobile: formData.mobile.trim(),
      email: formData.email?.trim() || '',
      preferredContactMethod: formData.preferredContactMethod || 'phone',
    },
    event: {
      type: formData.eventType,
      otherType: formData.otherEventType || '',
      date: formData.dateNotDecided ? '' : formData.eventDate || '',
      dateNotDecided: !!formData.dateNotDecided,
      timeSlot: formData.timeSlot || 'Lunch Banquet',
      guestCount: parseInt(formData.guestCount, 10) || 50,
      venueName: formData.venueAddress || '',
      venueAddress: formData.venueAddress || '',
      city: formData.city?.trim() || 'Maharashtra',
      notes: formData.notes || '',
    },
    catering: {
      type: formData.cateringType || 'with-material',
      packageId: formData.packageId || '',
      selectedDishes: formData.selectedDishes || '',
      specialDietary: formData.specialDietary || '',
      budgetRange: formData.budgetRange || '',
    },
    quotation: {
      status: 'Not Prepared',
      referenceNumber: '',
      amount: 0,
      sentAt: null,
      validUntil: null,
      remarks: '',
    },
    internalNotes: formData.initialNote
      ? [
          {
            id: `n-${Date.now()}`,
            message: formData.initialNote,
            author: adminName,
            createdAt: now,
          },
        ]
      : [],
    communicationLogs: [
      {
        id: `c-${Date.now()}`,
        channel: 'Phone Call / Direct Walk-in',
        summary: 'Manual booking created by admin.',
        author: adminName,
        createdAt: now,
      },
    ],
    auditHistory: [
      {
        id: `a-${Date.now()}`,
        action: 'Booking Created',
        status: formData.status || 'pending_review',
        changedBy: adminName,
        createdAt: now,
      },
    ],
    createdAt: now,
    updatedAt: now,
  };

  try {
    const res = await api.post('/admin/bookings', newBooking);
    if (res?.data?.success && res.data.data) {
      return res.data.data;
    }
  } catch {
    // Save to local storage
  }

  const all = getAllBookingsFromStorage();
  all.unshift(newBooking);
  saveBookingsToStorage(all);

  return newBooking;
}

/**
 * Update existing booking details
 */
export async function updateBookingDetails(id, updatedFields, adminName = 'Administrator') {
  const all = getAllBookingsFromStorage();
  const index = all.findIndex((b) => b.id === id);

  if (index === -1) {
    throw new Error(`Booking ${id} not found.`);
  }

  const now = new Date().toISOString();
  const prev = all[index];

  const updatedRecord = {
    ...prev,
    ...updatedFields,
    customer: { ...prev.customer, ...(updatedFields.customer || {}) },
    event: { ...prev.event, ...(updatedFields.event || {}) },
    catering: { ...prev.catering, ...(updatedFields.catering || {}) },
    quotation: { ...prev.quotation, ...(updatedFields.quotation || {}) },
    updatedAt: now,
  };

  updatedRecord.auditHistory = [
    {
      id: `a-${Date.now()}`,
      action: 'Details Updated',
      status: updatedRecord.status,
      changedBy: adminName,
      createdAt: now,
    },
    ...(prev.auditHistory || []),
  ];

  all[index] = updatedRecord;
  saveBookingsToStorage(all);

  return updatedRecord;
}

/**
 * Update booking status with audit history
 */
export async function updateBookingStatus(id, newStatus, reason = '', adminName = 'Administrator') {
  const all = getAllBookingsFromStorage();
  const index = all.findIndex((b) => b.id === id);

  if (index === -1) {
    throw new Error(`Booking ${id} not found.`);
  }

  const now = new Date().toISOString();
  const prev = all[index];

  const updated = {
    ...prev,
    status: newStatus,
    cancellationReason: newStatus === 'cancelled' ? reason : prev.cancellationReason,
    updatedAt: now,
    auditHistory: [
      {
        id: `a-${Date.now()}`,
        action: `Status changed from ${prev.status} to ${newStatus}`,
        status: newStatus,
        reason: reason || undefined,
        changedBy: adminName,
        createdAt: now,
      },
      ...(prev.auditHistory || []),
    ],
  };

  all[index] = updated;
  saveBookingsToStorage(all);

  return updated;
}

/**
 * Add an internal note to a booking
 */
export async function addInternalNote(id, noteText, adminName = 'Administrator') {
  if (!noteText.trim()) return null;

  const all = getAllBookingsFromStorage();
  const index = all.findIndex((b) => b.id === id);

  if (index === -1) {
    throw new Error(`Booking ${id} not found.`);
  }

  const now = new Date().toISOString();
  const newNote = {
    id: `n-${Date.now()}`,
    message: noteText.trim(),
    author: adminName,
    createdAt: now,
  };

  all[index].internalNotes = [newNote, ...(all[index].internalNotes || [])];
  all[index].updatedAt = now;

  saveBookingsToStorage(all);
  return newNote;
}

/**
 * Add a communication record
 */
export async function addCommunicationLog(id, logData, adminName = 'Administrator') {
  const all = getAllBookingsFromStorage();
  const index = all.findIndex((b) => b.id === id);

  if (index === -1) {
    throw new Error(`Booking ${id} not found.`);
  }

  const now = new Date().toISOString();
  const newLog = {
    id: `c-${Date.now()}`,
    channel: logData.channel || 'Phone',
    summary: logData.summary || '',
    followUpAt: logData.followUpAt || null,
    author: adminName,
    createdAt: now,
  };

  all[index].communicationLogs = [newLog, ...(all[index].communicationLogs || [])];
  all[index].updatedAt = now;

  saveBookingsToStorage(all);
  return newLog;
}

export default {
  BOOKING_STATUSES,
  normalizeStatus,
  getAllBookingsFromStorage,
  saveBookingsToStorage,
  fetchAdminBookings,
  fetchBookingById,
  createManualBooking,
  updateBookingDetails,
  updateBookingStatus,
  addInternalNote,
  addCommunicationLog,
};
