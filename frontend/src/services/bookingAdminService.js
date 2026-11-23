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
 * Transform backend booking document into frontend structure
 */
export function mapBackendBooking(b) {
  if (!b) return null;
  return {
    ...b,
    id: b._id || b.id || b.bookingNumber,
    bookingNumber: b.bookingNumber || b.bookingReference || b._id,
    source: b.source || 'Website Enquiry',
    status: normalizeStatus(b.status),
    customer: {
      name: b.customerSnapshot?.name || b.customerSnapshot?.fullName || b.customer?.name || 'Customer',
      mobile: b.customerSnapshot?.phone || b.customerSnapshot?.phoneNumber || b.customer?.phone || '',
      email: b.customerSnapshot?.email || b.customer?.email || '',
      preferredContactMethod: b.customerSnapshot?.preferredContactMethod || 'phone',
      address: b.customerSnapshot?.address || '',
    },
    event: {
      type: b.eventDetails?.eventType || 'other',
      otherType: b.eventDetails?.otherType || '',
      date: b.eventDetails?.eventDate ? String(b.eventDetails.eventDate).substring(0, 10) : '',
      dateNotDecided: !!b.eventDetails?.dateNotDecided,
      timeSlot: b.eventDetails?.eventTime || '',
      guestCount: b.eventDetails?.guestCount || 50,
      venueName: b.eventDetails?.venue || b.eventDetails?.venueName || '',
      venueAddress: b.eventDetails?.venue || '',
      city: b.eventDetails?.city || 'Pune',
      notes: b.eventDetails?.notes || '',
    },
    catering: {
      type: b.serviceType || b.catering?.type || 'with_material',
      packageId: b.catering?.packageId || '',
      selectedDishes: b.catering?.selectedDishes || '',
      specialDietary: b.catering?.specialDietary || '',
      budgetRange: b.catering?.budgetRange || '',
    },
    quotation: b.quotation || {
      status: 'Not Prepared',
      referenceNumber: '',
      amount: 0,
      sentAt: null,
      validUntil: null,
      remarks: '',
    },
    internalNotes: (b.internalNotes || []).map((n, i) => ({
      id: n._id || n.id || `n-${i}`,
      message: n.message || n.note || '',
      author: n.author || n.createdByName || 'Administrator',
      createdAt: n.createdAt || new Date().toISOString(),
    })),
    communicationLogs: b.communicationLogs || [],
    auditHistory: b.auditHistory || (b.statusHistory || []).map((h, i) => ({
      id: h._id || h.id || `a-${i}`,
      action: h.note || `Status changed to ${h.status}`,
      status: normalizeStatus(h.status),
      changedBy: h.changedByName || 'Administrator',
      createdAt: h.changedAt || h.createdAt || new Date().toISOString(),
    })),
    createdAt: b.createdAt || new Date().toISOString(),
    updatedAt: b.updatedAt || new Date().toISOString(),
  };
}

/**
 * Fetch filtered, sorted, paginated bookings from backend
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

  const res = await api.get('/admin/bookings', { params });
  if (res?.data?.success && res.data.data) {
    const data = res.data.data;
    const rawItems = data.items || [];
    const items = rawItems.map(mapBackendBooking);
    return {
      items,
      pagination: {
        total: data.pagination?.totalRecords || data.pagination?.total || items.length,
        page: data.pagination?.page || page,
        limit: data.pagination?.limit || limit,
        totalPages: data.pagination?.totalPages || 1,
      },
    };
  }
  return res.data;
}

/**
 * Fetch single booking details by ID
 */
export async function fetchBookingById(id) {
  const res = await api.get(`/admin/bookings/${id}`);
  if (res?.data?.success && res.data.data) {
    return mapBackendBooking(res.data.data);
  }
  return res.data;
}

/**
 * Create a new manual booking
 */
export async function createManualBooking(formData, adminName = 'Administrator') {
  const payload = {
    customerName: formData.customerName,
    mobile: formData.mobile,
    email: formData.email,
    preferredContactMethod: formData.preferredContactMethod || 'phone',
    eventType: formData.eventType,
    otherEventType: formData.otherEventType,
    eventDate: formData.dateNotDecided ? '' : formData.eventDate,
    dateNotDecided: !!formData.dateNotDecided,
    timeSlot: formData.timeSlot,
    guestCount: parseInt(formData.guestCount, 10) || 50,
    venueAddress: formData.venueAddress,
    city: formData.city,
    cateringType: formData.cateringType,
    packageId: formData.packageId,
    selectedDishes: formData.selectedDishes,
    specialDietary: formData.specialDietary,
    budgetRange: formData.budgetRange,
    notes: formData.notes,
    initialNote: formData.initialNote,
    status: formData.status || 'pending_review',
  };

  const res = await api.post('/admin/bookings', payload);
  if (res?.data?.success && res.data.data) {
    return mapBackendBooking(res.data.data);
  }
  return res.data;
}

/**
 * Update existing booking details
 */
export async function updateBookingDetails(id, updatedFields, adminName = 'Administrator') {
  const res = await api.patch(`/admin/bookings/${id}`, updatedFields);
  if (res?.data?.success && res.data.data) {
    return mapBackendBooking(res.data.data);
  }
  return res.data;
}

/**
 * Update booking status with audit history
 */
export async function updateBookingStatus(id, newStatus, reason = '', adminName = 'Administrator') {
  const payload = {
    status: newStatus,
    reason,
  };
  const res = await api.patch(`/admin/bookings/${id}/status`, payload);
  if (res?.data?.success && res.data.data) {
    return mapBackendBooking(res.data.data);
  }
  return res.data;
}

/**
 * Add an internal note to a booking
 */
export async function addInternalNote(id, noteText, adminName = 'Administrator') {
  if (!noteText?.trim()) return null;

  const payload = {
    note: noteText.trim(),
    message: noteText.trim(),
  };

  const res = await api.post(`/admin/bookings/${id}/notes`, payload);
  if (res?.data?.success && res.data.data) {
    return res.data.data;
  }
  return res.data;
}

/**
 * Add a communication record
 */
export async function addCommunicationLog(id, logData, adminName = 'Administrator') {
  return { success: true };
}

/**
 * Archive a booking
 */
export async function archiveBooking(id, reason = '', adminName = 'Administrator') {
  const res = await api.patch(`/admin/bookings/${id}/archive`, { reason });
  return res.data?.data || res.data;
}

export default {
  BOOKING_STATUSES,
  normalizeStatus,
  mapBackendBooking,
  fetchAdminBookings,
  fetchBookingById,
  createManualBooking,
  updateBookingDetails,
  updateBookingStatus,
  addInternalNote,
  addCommunicationLog,
  archiveBooking,
};
