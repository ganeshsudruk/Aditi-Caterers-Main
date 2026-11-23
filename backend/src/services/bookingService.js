const Booking = require('../models/Booking');
const Customer = require('../models/Customer');
const AuditLog = require('../models/AuditLog');
const ApiError = require('../utils/ApiError');
const { generateBookingNumber } = require('../utils/bookingNumber');
const { normalizePhone, parsePaginationAndSort, isValidObjectId } = require('../utils/pagination');
const { VALID_TRANSITIONS } = require('../constants/bookingStatus');

/**
 * Handle public booking enquiry submission
 */
const submitPublicBooking = async (submissionData, clientInfo = {}) => {
  // 1. Extract customer fields supporting both shapes (nested customer.* or flat)
  const fullName =
    submissionData.customer?.fullName ||
    submissionData.customer?.name ||
    submissionData.customerName ||
    submissionData.fullName ||
    '';
  const phoneNumber =
    submissionData.customer?.phoneNumber ||
    submissionData.customer?.phone ||
    submissionData.mobile ||
    submissionData.phoneNumber ||
    '';
  const email =
    submissionData.customer?.email ||
    submissionData.email ||
    '';
  const address =
    submissionData.customer?.address ||
    submissionData.address ||
    submissionData.event?.venueAddress ||
    submissionData.venueAddress ||
    '';
  const preferredContactMethod =
    submissionData.customer?.preferredContactMethod ||
    submissionData.preferredContactMethod ||
    'phone';

  if (!fullName.trim()) {
    throw ApiError.badRequest('Full name is required');
  }
  if (!phoneNumber.trim()) {
    throw ApiError.badRequest('Phone number is required');
  }

  // 2. Extract event fields
  const eventType =
    submissionData.event?.eventType ||
    submissionData.eventType ||
    'wedding';
  const otherType =
    submissionData.event?.otherType ||
    submissionData.otherEventType ||
    '';
  const eventDate =
    submissionData.event?.eventDate ||
    submissionData.eventDate ||
    null;
  const dateNotDecided = !!(
    submissionData.event?.dateNotDecided ||
    submissionData.dateNotDecided
  );
  const eventTime =
    submissionData.event?.eventTime ||
    submissionData.event?.startTime ||
    submissionData.eventTime ||
    submissionData.mealType ||
    '';
  const startTime =
    submissionData.event?.startTime ||
    submissionData.startTime ||
    '';
  const endTime =
    submissionData.event?.endTime ||
    submissionData.endTime ||
    '';
  const venue =
    submissionData.event?.venueName ||
    submissionData.event?.venue ||
    submissionData.venueName ||
    submissionData.venueAddress ||
    '';
  const city =
    submissionData.event?.city ||
    submissionData.city ||
    submissionData.eventCity ||
    'Maharashtra';
  const guestCount = parseInt(
    submissionData.event?.guestCount ||
    submissionData.guestCount ||
    0,
    10
  );

  const serviceType =
    submissionData.serviceType ||
    submissionData.cateringType ||
    'with_material';

  const requestedMenu =
    submissionData.requestedMenu ||
    (submissionData.selectedDishes ? [submissionData.selectedDishes] : []);

  const customerMessage =
    submissionData.customerMessage ||
    submissionData.message ||
    submissionData.notes ||
    '';

  // 3. Duplicate check within a short window (10 minutes) for exact phone & event date
  const cleanPhone = normalizePhone(phoneNumber);
  if (cleanPhone) {
    const duplicateQuery = {
      'customerSnapshot.phone': { $regex: cleanPhone },
      createdAt: { $gte: new Date(Date.now() - 10 * 60 * 1000) },
    };
    if (eventDate) {
      duplicateQuery['eventDetails.eventDate'] = new Date(eventDate);
    }
    const recentDuplicate = await Booking.findOne(duplicateQuery).lean();
    if (recentDuplicate) {
      // Return existing reference to prevent flood / double charging
      return {
        bookingNumber: recentDuplicate.bookingNumber || recentDuplicate.bookingReference,
        status: recentDuplicate.status,
        alreadySubmitted: true,
      };
    }
  }

  // 4. Customer Association / Creation
  let matchedCustomer = null;
  if (cleanPhone) {
    matchedCustomer = await Customer.findOne({
      $or: [{ phone: phoneNumber }, { normalizedPhone: cleanPhone }],
    });

    if (!matchedCustomer) {
      // Create new customer profile
      matchedCustomer = await Customer.create({
        name: fullName.trim(),
        phone: phoneNumber.trim(),
        normalizedPhone: cleanPhone,
        email: email.trim().toLowerCase(),
        address: address.trim(),
        preferredLanguage: 'mr',
        source: 'website',
      }).catch(() => null);
    }
  }

  // 5. Generate human-readable booking number
  const bookingNumber = await generateBookingNumber();

  // 6. Create booking document with status "new"
  const newBooking = await Booking.create({
    bookingNumber,
    bookingReference: bookingNumber,
    customer: matchedCustomer ? matchedCustomer._id : null,
    customerSnapshot: {
      name: fullName.trim(),
      fullName: fullName.trim(),
      phone: phoneNumber.trim(),
      phoneNumber: phoneNumber.trim(),
      email: email.trim().toLowerCase(),
      address: address.trim(),
      preferredContactMethod,
    },
    eventDetails: {
      eventType,
      otherType,
      eventDate: eventDate ? new Date(eventDate) : undefined,
      dateNotDecided,
      eventTime,
      startTime,
      endTime,
      venue,
      venueName: venue,
      venueAddress: address || venue,
      city,
      guestCount: isNaN(guestCount) ? 0 : guestCount,
      notes: customerMessage,
    },
    serviceType,
    requestedMenu,
    cateringDetails: {
      packageId: submissionData.packageId || submissionData.package || '',
      selectedDishes: submissionData.selectedDishes || '',
      specialDietary: submissionData.specialDietary || '',
      budgetRange: submissionData.budgetRange || '',
    },
    customerMessage,
    status: 'new',
    statusHistory: [
      {
        status: 'new',
        changedByName: 'Customer (Website)',
        note: 'Initial booking request submitted from public website',
        changedAt: new Date(),
      },
    ],
    communicationLogs: [
      {
        channel: 'Website Form',
        summary: 'Customer submitted initial catering request on website.',
        author: 'System',
        createdAt: new Date(),
      },
    ],
    source: 'website',
    isEnquiry: false,
  });

  // 7. Audit Log
  await AuditLog.create({
    action: 'booking.created_public',
    entityType: 'Booking',
    entityId: newBooking._id,
    details: { bookingNumber, phone: cleanPhone, eventType },
    ipAddress: clientInfo.ipAddress || '',
    userAgent: clientInfo.userAgent || '',
  }).catch(() => {});

  return {
    bookingNumber: newBooking.bookingNumber,
    status: newBooking.status,
  };
};

/**
 * Admin: List bookings with filters, search, sorting, pagination
 */
const getAdminBookings = async (queryParams) => {
  const {
    search,
    status,
    eventType,
    serviceType,
    cateringType,
    fromDate,
    toDate,
    archived,
  } = queryParams;

  const filter = {};

  // Default: exclude archived unless explicitly requested
  if (archived === 'true' || archived === true) {
    filter.isArchived = true;
  } else {
    filter.isArchived = { $ne: true };
  }

  // Status Filter
  if (status && status !== 'all') {
    if (status === 'new' || status === 'pending_review') {
      filter.status = { $in: ['new', 'pending_review'] };
    } else if (status === 'completed' || status === 'event_completed') {
      filter.status = { $in: ['completed', 'event_completed'] };
    } else {
      filter.status = status;
    }
  }

  // Event Type Filter
  if (eventType && eventType !== 'all') {
    filter['eventDetails.eventType'] = { $regex: new RegExp(`^${eventType}$`, 'i') };
  }

  // Service / Catering Type Filter
  const sType = serviceType || cateringType;
  if (sType && sType !== 'all') {
    filter.serviceType = { $regex: new RegExp(`^${sType}$`, 'i') };
  }

  // Date Range Filters (Event Date)
  if (fromDate || toDate) {
    filter['eventDetails.eventDate'] = {};
    if (fromDate) filter['eventDetails.eventDate'].$gte = new Date(fromDate);
    if (toDate) filter['eventDetails.eventDate'].$lte = new Date(toDate);
  }

  // Search Filter: bookingNumber, customer name, phone, city
  if (search && search.trim()) {
    const q = search.trim();
    filter.$or = [
      { bookingNumber: { $regex: q, $options: 'i' } },
      { bookingReference: { $regex: q, $options: 'i' } },
      { 'customerSnapshot.name': { $regex: q, $options: 'i' } },
      { 'customerSnapshot.fullName': { $regex: q, $options: 'i' } },
      { 'customerSnapshot.phone': { $regex: q, $options: 'i' } },
      { 'eventDetails.city': { $regex: q, $options: 'i' } },
    ];
  }

  const { page, limit, skip, sort } = parsePaginationAndSort(
    queryParams,
    ['createdAt', 'updatedAt', 'eventDetails.eventDate', 'status'],
    'createdAt'
  );

  const [items, totalRecords] = await Promise.all([
    Booking.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('customer', 'name phone email preferredLanguage')
      .lean(),
    Booking.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalRecords / limit) || 1;

  return {
    items,
    pagination: {
      page,
      limit,
      totalRecords,
      total: totalRecords,
      totalPages,
    },
  };
};

/**
 * Admin: Get single booking details by ObjectId or bookingNumber
 */
const getBookingById = async (idOrNumber) => {
  const query = isValidObjectId(idOrNumber)
    ? { $or: [{ _id: idOrNumber }, { bookingNumber: idOrNumber }, { bookingReference: idOrNumber }] }
    : { $or: [{ bookingNumber: idOrNumber }, { bookingReference: idOrNumber }] };

  const booking = await Booking.findOne(query)
    .populate('customer')
    .populate('quotation')
    .populate('statusHistory.changedBy', 'name fullName email role')
    .lean();

  if (!booking) {
    throw ApiError.notFound(`Booking not found with reference: ${idOrNumber}`);
  }

  return booking;
};

/**
 * Admin: Create manual booking
 */
const createManualBooking = async (formData, adminUser) => {
  const bookingNumber = await generateBookingNumber();
  const customerName = formData.customerName || formData.customer?.name || 'Customer';
  const phone = formData.mobile || formData.phone || formData.customer?.phone || '';
  const email = formData.email || formData.customer?.email || '';

  const newBooking = await Booking.create({
    bookingNumber,
    bookingReference: bookingNumber,
    customerSnapshot: {
      name: customerName,
      phone,
      email,
      address: formData.venueAddress || '',
      preferredContactMethod: formData.preferredContactMethod || 'phone',
    },
    eventDetails: {
      eventType: formData.eventType || 'wedding',
      otherType: formData.otherEventType || '',
      eventDate: formData.eventDate ? new Date(formData.eventDate) : undefined,
      dateNotDecided: !!formData.dateNotDecided,
      eventTime: formData.timeSlot || formData.eventTime || '',
      venue: formData.venueAddress || '',
      city: formData.city || 'Maharashtra',
      guestCount: parseInt(formData.guestCount, 10) || 0,
      notes: formData.notes || '',
    },
    serviceType: formData.cateringType || formData.serviceType || 'with_material',
    status: formData.status || 'pending_review',
    source: 'Admin Created',
    statusHistory: [
      {
        status: formData.status || 'pending_review',
        changedBy: adminUser?.id || null,
        changedByName: adminUser?.name || 'Administrator',
        note: 'Manual booking created by admin',
        changedAt: new Date(),
      },
    ],
    internalNotes: formData.initialNote
      ? [
          {
            message: formData.initialNote,
            author: adminUser?.name || 'Administrator',
            createdBy: adminUser?.id || null,
            createdAt: new Date(),
          },
        ]
      : [],
  });

  return newBooking;
};

/**
 * Admin: Update allowed booking details
 */
const updateBookingDetails = async (idOrNumber, updatePayload, adminUser) => {
  const booking = await Booking.findOne(
    isValidObjectId(idOrNumber)
      ? { $or: [{ _id: idOrNumber }, { bookingNumber: idOrNumber }] }
      : { bookingNumber: idOrNumber }
  );

  if (!booking) {
    throw ApiError.notFound(`Booking not found: ${idOrNumber}`);
  }

  // Allowlist of editable fields
  if (updatePayload.customer) {
    if (updatePayload.customer.name) booking.customerSnapshot.name = updatePayload.customer.name;
    if (updatePayload.customer.phone) booking.customerSnapshot.phone = updatePayload.customer.phone;
    if (updatePayload.customer.email !== undefined) booking.customerSnapshot.email = updatePayload.customer.email;
    if (updatePayload.customer.address !== undefined) booking.customerSnapshot.address = updatePayload.customer.address;
  }

  if (updatePayload.event) {
    if (updatePayload.event.type || updatePayload.event.eventType) {
      booking.eventDetails.eventType = updatePayload.event.type || updatePayload.event.eventType;
    }
    if (updatePayload.event.date || updatePayload.event.eventDate) {
      booking.eventDetails.eventDate = new Date(updatePayload.event.date || updatePayload.event.eventDate);
    }
    if (updatePayload.event.guestCount !== undefined) {
      booking.eventDetails.guestCount = parseInt(updatePayload.event.guestCount, 10);
    }
    if (updatePayload.event.venueAddress !== undefined) {
      booking.eventDetails.venueAddress = updatePayload.event.venueAddress;
      booking.eventDetails.venue = updatePayload.event.venueAddress;
    }
    if (updatePayload.event.city !== undefined) {
      booking.eventDetails.city = updatePayload.event.city;
    }
    if (updatePayload.event.notes !== undefined) {
      booking.eventDetails.notes = updatePayload.event.notes;
    }
  }

  if (updatePayload.catering) {
    if (updatePayload.catering.type) booking.serviceType = updatePayload.catering.type;
    if (updatePayload.catering.packageId !== undefined) {
      booking.cateringDetails.packageId = updatePayload.catering.packageId;
    }
    if (updatePayload.catering.selectedDishes !== undefined) {
      booking.cateringDetails.selectedDishes = updatePayload.catering.selectedDishes;
    }
  }

  if (updatePayload.estimatedAmount !== undefined) {
    booking.estimatedAmount = Number(updatePayload.estimatedAmount) || 0;
  }

  await booking.save();

  await AuditLog.create({
    actorId: adminUser?.id || null,
    action: 'booking.updated',
    entityType: 'Booking',
    entityId: booking._id,
    details: { bookingNumber: booking.bookingNumber },
  }).catch(() => {});

  return booking;
};

/**
 * Admin: Update booking status with state transition check
 */
const updateBookingStatus = async (idOrNumber, newStatus, note, reason, adminUser) => {
  const booking = await Booking.findOne(
    isValidObjectId(idOrNumber)
      ? { $or: [{ _id: idOrNumber }, { bookingNumber: idOrNumber }] }
      : { bookingNumber: idOrNumber }
  );

  if (!booking) {
    throw ApiError.notFound(`Booking not found: ${idOrNumber}`);
  }

  const currentStatus = booking.status || 'new';

  // Check valid transition (unless current and new are identical)
  if (currentStatus !== newStatus) {
    const allowedNext = VALID_TRANSITIONS[currentStatus] || [];
    if (!allowedNext.includes(newStatus)) {
      throw ApiError.badRequest(
        `Invalid status transition from '${currentStatus}' to '${newStatus}'. Allowed: ${allowedNext.join(', ') || 'None'}`
      );
    }
  }

  booking.status = newStatus;
  if (newStatus === 'cancelled' && reason) {
    booking.cancellationReason = reason;
  }

  booking.statusHistory.push({
    status: newStatus,
    changedBy: adminUser?.id || null,
    changedByName: adminUser?.name || 'Administrator',
    note: note || reason || `Status changed from ${currentStatus} to ${newStatus}`,
    changedAt: new Date(),
  });

  await booking.save();

  await AuditLog.create({
    actorId: adminUser?.id || null,
    action: 'booking.status_changed',
    entityType: 'Booking',
    entityId: booking._id,
    details: {
      bookingNumber: booking.bookingNumber,
      fromStatus: currentStatus,
      toStatus: newStatus,
      note,
    },
  }).catch(() => {});

  return booking;
};

/**
 * Admin: Add internal note
 */
const addInternalNote = async (idOrNumber, noteText, adminUser) => {
  const booking = await Booking.findOne(
    isValidObjectId(idOrNumber)
      ? { $or: [{ _id: idOrNumber }, { bookingNumber: idOrNumber }] }
      : { bookingNumber: idOrNumber }
  );

  if (!booking) {
    throw ApiError.notFound(`Booking not found: ${idOrNumber}`);
  }

  const newNote = {
    message: noteText.trim(),
    author: adminUser?.name || 'Administrator',
    createdBy: adminUser?.id || null,
    createdAt: new Date(),
  };

  booking.internalNotes.unshift(newNote);
  await booking.save();

  return newNote;
};

/**
 * Admin: Archive booking
 */
const archiveBooking = async (idOrNumber, adminUser) => {
  const booking = await Booking.findOne(
    isValidObjectId(idOrNumber)
      ? { $or: [{ _id: idOrNumber }, { bookingNumber: idOrNumber }] }
      : { bookingNumber: idOrNumber }
  );

  if (!booking) {
    throw ApiError.notFound(`Booking not found: ${idOrNumber}`);
  }

  booking.isArchived = true;
  await booking.save();

  await AuditLog.create({
    actorId: adminUser?.id || null,
    action: 'booking.archived',
    entityType: 'Booking',
    entityId: booking._id,
    details: { bookingNumber: booking.bookingNumber },
  }).catch(() => {});

  return { message: `Booking ${booking.bookingNumber} archived successfully` };
};

module.exports = {
  submitPublicBooking,
  getAdminBookings,
  getBookingById,
  createManualBooking,
  updateBookingDetails,
  updateBookingStatus,
  addInternalNote,
  archiveBooking,
};
