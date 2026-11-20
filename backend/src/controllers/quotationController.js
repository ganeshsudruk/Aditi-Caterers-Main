const Quotation = require('../models/Quotation');
const Booking = require('../models/Booking');

/**
 * Generate unique quotation number AC-QTN-YYYY-XXXX
 */
async function generateNextQuotationNumber() {
  const currentYear = new Date().getFullYear();
  const prefix = `AC-QTN-${currentYear}-`;

  const lastQuotation = await Quotation.findOne({
    quotationNumber: new RegExp(`^${prefix}\\d{4}$`),
  })
    .sort({ quotationNumber: -1 })
    .select('quotationNumber')
    .lean();

  let nextSequence = 1;
  if (lastQuotation?.quotationNumber) {
    const parts = lastQuotation.quotationNumber.split('-');
    const lastSeq = parseInt(parts[parts.length - 1], 10);
    if (!isNaN(lastSeq)) {
      nextSequence = lastSeq + 1;
    }
  }

  const padded = String(nextSequence).padStart(4, '0');
  return `${prefix}${padded}`;
}

/**
 * Helper to calculate consistent quotation totals
 */
function calculateTotals(payload) {
  const lineItems = (payload.lineItems || []).map((item) => {
    const quantity = Math.max(0, parseFloat(item.quantity) || 0);
    const rate = Math.max(0, parseFloat(item.rate) || 0);
    const lineTotal = Math.round(quantity * rate * 100) / 100;
    return {
      name: (item.name || '').trim(),
      description: (item.description || '').trim(),
      category: item.category || 'food',
      quantity,
      unit: item.unit || 'per_person',
      rate,
      lineTotal,
    };
  });

  const subtotal = lineItems.reduce((sum, item) => sum + item.lineTotal, 0);

  // Discount calculation
  let discountAmount = 0;
  const discountType = payload.discount?.type || 'none';
  const discountVal = Math.max(0, parseFloat(payload.discount?.value) || 0);

  if (discountType === 'percentage') {
    discountAmount = Math.round((subtotal * discountVal) / 100 * 100) / 100;
  } else if (discountType === 'fixed') {
    discountAmount = discountVal;
  }
  discountAmount = Math.min(discountAmount, subtotal);

  // Additional charges
  const additionalCharges = (payload.additionalCharges || []).map((ch) => ({
    label: (ch.label || '').trim(),
    amount: Math.max(0, parseFloat(ch.amount) || 0),
  }));
  const totalAdditional = additionalCharges.reduce((sum, ch) => sum + ch.amount, 0);

  // Tax details
  const taxRate = Math.max(0, parseFloat(payload.taxDetails?.rate) || 0);
  const taxableAmount = Math.max(0, subtotal - discountAmount + totalAdditional);
  const taxAmount = taxRate > 0 ? Math.round((taxableAmount * taxRate) / 100 * 100) / 100 : 0;

  const grandTotal = Math.round((taxableAmount + taxAmount) * 100) / 100;

  return {
    lineItems,
    subtotal,
    discount: {
      type: discountType,
      value: discountVal,
      amount: discountAmount,
      reason: (payload.discount?.reason || '').trim(),
    },
    additionalCharges,
    taxDetails: {
      label: payload.taxDetails?.label || 'GST',
      rate: taxRate,
      amount: taxAmount,
    },
    grandTotal,
  };
}

/**
 * GET /api/admin/quotations
 */
exports.getAdminQuotations = async (req, res, next) => {
  try {
    const {
      search = '',
      statusFilter = 'all',
      serviceTypeFilter = 'all',
      sortBy = 'newest',
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (statusFilter !== 'all') query.status = statusFilter;
    if (serviceTypeFilter !== 'all') query.serviceType = serviceTypeFilter;

    if (search && search.trim()) {
      const q = new RegExp(search.trim(), 'i');
      query.$or = [
        { quotationNumber: q },
        { 'customerSnapshot.name': q },
        { 'customerSnapshot.mobile': q },
        { 'customerSnapshot.email': q },
        { 'eventSnapshot.eventType': q },
        { 'eventSnapshot.venue': q },
      ];
    }

    let sortQuery = { createdAt: -1 };
    if (sortBy === 'oldest') sortQuery = { createdAt: 1 };
    else if (sortBy === 'amount_high') sortQuery = { grandTotal: -1 };
    else if (sortBy === 'amount_low') sortQuery = { grandTotal: 1 };
    else if (sortBy === 'event_date_asc') sortQuery = { 'eventSnapshot.eventDate': 1 };
    else if (sortBy === 'event_date_desc') sortQuery = { 'eventSnapshot.eventDate': -1 };

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const skip = (pageNum - 1) * limitNum;

    const [quotations, total] = await Promise.all([
      Quotation.find(query).sort(sortQuery).skip(skip).limit(limitNum).lean(),
      Quotation.countDocuments(query),
    ]);

    const [
      draft,
      issued,
      accepted,
      rejected,
      revision_requested,
      expired,
      cancelled,
    ] = await Promise.all([
      Quotation.countDocuments({ status: 'draft' }),
      Quotation.countDocuments({ status: 'issued' }),
      Quotation.countDocuments({ status: 'accepted' }),
      Quotation.countDocuments({ status: 'rejected' }),
      Quotation.countDocuments({ status: 'revision_requested' }),
      Quotation.countDocuments({ status: 'expired' }),
      Quotation.countDocuments({ status: 'cancelled' }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        items: quotations,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum) || 1,
        },
        counts: {
          total,
          draft,
          issued,
          accepted,
          rejected,
          revision_requested,
          expired,
          cancelled,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/admin/quotations/:id
 */
exports.getQuotationById = async (req, res, next) => {
  try {
    const quotation = await Quotation.findById(req.params.id)
      .populate('parentQuotation', 'quotationNumber revisionNumber status grandTotal')
      .lean();
    if (!quotation) {
      return res.status(404).json({ success: false, message: 'Quotation not found.' });
    }
    res.status(200).json({ success: true, data: quotation });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/admin/quotations
 */
exports.createQuotation = async (req, res, next) => {
  try {
    const {
      customerSnapshot,
      eventSnapshot,
      serviceType,
      documentLanguage,
      notes,
      termsSnapshot,
      validUntil,
      enquiryId,
      customerId,
    } = req.body;

    if (!customerSnapshot?.name || !customerSnapshot?.mobile) {
      return res.status(400).json({
        success: false,
        message: 'Customer name and mobile number are required.',
      });
    }

    if (!eventSnapshot?.eventType || !eventSnapshot?.eventDate || !eventSnapshot?.guestCount) {
      return res.status(400).json({
        success: false,
        message: 'Event type, event date, and guest count are required.',
      });
    }

    const totals = calculateTotals(req.body);
    const quotationNumber = await generateNextQuotationNumber();

    const quotation = await Quotation.create({
      quotationNumber,
      revisionNumber: 0,
      customer: customerId || null,
      enquiry: enquiryId || null,
      customerSnapshot: {
        name: customerSnapshot.name.trim(),
        mobile: customerSnapshot.mobile.trim(),
        email: (customerSnapshot.email || '').trim(),
        address: (customerSnapshot.address || '').trim(),
      },
      eventSnapshot: {
        eventType: eventSnapshot.eventType.trim(),
        eventDate: new Date(eventSnapshot.eventDate),
        eventTime: (eventSnapshot.eventTime || '').trim(),
        venue: (eventSnapshot.venue || '').trim(),
        guestCount: parseInt(eventSnapshot.guestCount, 10),
      },
      serviceType: serviceType || 'with_material',
      documentLanguage: documentLanguage || 'en',
      ...totals,
      notes: (notes || '').trim(),
      termsSnapshot: (termsSnapshot || '').trim(),
      validUntil: validUntil ? new Date(validUntil) : null,
      status: 'draft',
      quotationDate: new Date(),
    });

    res.status(201).json({ success: true, data: quotation });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/admin/quotations/from-enquiry/:enquiryId
 */
exports.createFromEnquiry = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.enquiryId).lean();
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking enquiry not found.' });
    }

    const quotationNumber = await generateNextQuotationNumber();

    const customerSnapshot = {
      name: booking.customer?.name || '',
      mobile: booking.customer?.mobile || '',
      email: booking.customer?.email || '',
      address: booking.customer?.address || '',
    };

    const eventSnapshot = {
      eventType: booking.eventDetails?.eventType || 'wedding',
      eventDate: booking.eventDetails?.eventDate || new Date(),
      eventTime: booking.eventDetails?.eventTime || '',
      venue: booking.eventDetails?.venue || '',
      guestCount: booking.eventDetails?.guestCount || 100,
    };

    const serviceType = booking.serviceType || 'with_material';

    // Seed default line item based on guest count and package or service
    const defaultLineItems = [
      {
        name: `${eventSnapshot.eventType.toUpperCase()} Catering Package`,
        description: `Full catering service for ${eventSnapshot.guestCount} guests (${serviceType.replace('_', ' ')})`,
        category: 'food',
        quantity: eventSnapshot.guestCount,
        unit: 'per_person',
        rate: serviceType === 'with_material' ? 450 : 250,
        lineTotal: eventSnapshot.guestCount * (serviceType === 'with_material' ? 450 : 250),
      },
    ];

    const totals = calculateTotals({ lineItems: defaultLineItems });

    const quotation = await Quotation.create({
      quotationNumber,
      revisionNumber: 0,
      customer: booking.customer?._id || null,
      enquiry: booking._id,
      customerSnapshot,
      eventSnapshot,
      serviceType,
      documentLanguage: 'en',
      ...totals,
      notes: booking.specialRequests || '',
      status: 'draft',
      quotationDate: new Date(),
    });

    res.status(201).json({ success: true, data: quotation });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/admin/quotations/:id
 */
exports.updateQuotation = async (req, res, next) => {
  try {
    const quotation = await Quotation.findById(req.params.id);
    if (!quotation) {
      return res.status(404).json({ success: false, message: 'Quotation not found.' });
    }

    // Issued / final quotations are locked from direct modification; must create revision
    if (quotation.status !== 'draft') {
      return res.status(400).json({
        success: false,
        message: `Cannot edit quotation in '${quotation.status}' status. Please create a revised quotation instead.`,
      });
    }

    const {
      customerSnapshot,
      eventSnapshot,
      serviceType,
      documentLanguage,
      notes,
      termsSnapshot,
      validUntil,
    } = req.body;

    if (customerSnapshot) {
      if (customerSnapshot.name) quotation.customerSnapshot.name = customerSnapshot.name.trim();
      if (customerSnapshot.mobile) quotation.customerSnapshot.mobile = customerSnapshot.mobile.trim();
      if (customerSnapshot.email !== undefined) quotation.customerSnapshot.email = customerSnapshot.email.trim();
      if (customerSnapshot.address !== undefined) quotation.customerSnapshot.address = customerSnapshot.address.trim();
    }

    if (eventSnapshot) {
      if (eventSnapshot.eventType) quotation.eventSnapshot.eventType = eventSnapshot.eventType.trim();
      if (eventSnapshot.eventDate) quotation.eventSnapshot.eventDate = new Date(eventSnapshot.eventDate);
      if (eventSnapshot.eventTime !== undefined) quotation.eventSnapshot.eventTime = eventSnapshot.eventTime.trim();
      if (eventSnapshot.venue !== undefined) quotation.eventSnapshot.venue = eventSnapshot.venue.trim();
      if (eventSnapshot.guestCount) quotation.eventSnapshot.guestCount = parseInt(eventSnapshot.guestCount, 10);
    }

    if (serviceType) quotation.serviceType = serviceType;
    if (documentLanguage) quotation.documentLanguage = documentLanguage;
    if (notes !== undefined) quotation.notes = notes.trim();
    if (termsSnapshot !== undefined) quotation.termsSnapshot = termsSnapshot.trim();
    if (validUntil !== undefined) quotation.validUntil = validUntil ? new Date(validUntil) : null;

    // Recalculate totals
    const totals = calculateTotals(req.body);
    quotation.lineItems = totals.lineItems;
    quotation.subtotal = totals.subtotal;
    quotation.discount = totals.discount;
    quotation.additionalCharges = totals.additionalCharges;
    quotation.taxDetails = totals.taxDetails;
    quotation.grandTotal = totals.grandTotal;

    await quotation.save();
    res.status(200).json({ success: true, data: quotation });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/admin/quotations/:id/issue
 */
exports.issueQuotation = async (req, res, next) => {
  try {
    const quotation = await Quotation.findById(req.params.id);
    if (!quotation) {
      return res.status(404).json({ success: false, message: 'Quotation not found.' });
    }

    if (quotation.status !== 'draft') {
      return res.status(400).json({
        success: false,
        message: `Quotation is already in '${quotation.status}' status.`,
      });
    }

    if (!quotation.lineItems || quotation.lineItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one line item is required before issuing a quotation.',
      });
    }

    // Default valid until: 15 days from issue date if not set
    const issueDate = new Date();
    const defaultValidUntil = new Date(issueDate.getTime() + 15 * 24 * 60 * 60 * 1000);

    quotation.status = 'issued';
    quotation.issuedAt = issueDate;
    if (!quotation.validUntil) {
      quotation.validUntil = defaultValidUntil;
    }

    await quotation.save();
    res.status(200).json({ success: true, data: quotation, message: 'Quotation issued successfully.' });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/admin/quotations/:id/revisions
 */
exports.createRevision = async (req, res, next) => {
  try {
    const parent = await Quotation.findById(req.params.id);
    if (!parent) {
      return res.status(404).json({ success: false, message: 'Parent quotation not found.' });
    }

    // Mark previous quotation as superseded
    parent.status = 'superseded';
    await parent.save();

    const nextRevisionNum = (parent.revisionNumber || 0) + 1;
    const baseNumber = parent.quotationNumber.split('-R')[0];
    const newQuotationNumber = `${baseNumber}-R${nextRevisionNum}`;

    const newRevision = await Quotation.create({
      quotationNumber: newQuotationNumber,
      revisionNumber: nextRevisionNum,
      parentQuotation: parent._id,
      customer: parent.customer,
      enquiry: parent.enquiry,
      customerSnapshot: parent.customerSnapshot,
      eventSnapshot: parent.eventSnapshot,
      serviceType: parent.serviceType,
      documentLanguage: parent.documentLanguage,
      lineItems: parent.lineItems,
      subtotal: parent.subtotal,
      discount: parent.discount,
      additionalCharges: parent.additionalCharges,
      taxDetails: parent.taxDetails,
      grandTotal: parent.grandTotal,
      notes: parent.notes,
      termsSnapshot: parent.termsSnapshot,
      validUntil: null,
      status: 'draft',
      quotationDate: new Date(),
    });

    res.status(201).json({
      success: true,
      data: newRevision,
      message: `Revision ${nextRevisionNum} created as draft.`,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/admin/quotations/:id/status
 */
exports.updateQuotationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowed = ['cancelled', 'expired'];
    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${allowed.join(', ')}. Use dedicated response endpoint for customer replies.`,
      });
    }

    const quotation = await Quotation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).lean();

    if (!quotation) {
      return res.status(404).json({ success: false, message: 'Quotation not found.' });
    }

    res.status(200).json({ success: true, data: quotation });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/admin/quotations/:id/response
 */
exports.recordCustomerResponse = async (req, res, next) => {
  try {
    const { response, responseNotes } = req.body;
    const validResponses = ['accepted', 'rejected', 'revision_requested'];
    if (!validResponses.includes(response)) {
      return res.status(400).json({
        success: false,
        message: `Response must be one of: ${validResponses.join(', ')}`,
      });
    }

    const quotation = await Quotation.findById(req.params.id);
    if (!quotation) {
      return res.status(404).json({ success: false, message: 'Quotation not found.' });
    }

    quotation.status = response;
    quotation.responseDate = new Date();
    quotation.responseNotes = (responseNotes || '').trim();

    await quotation.save();
    res.status(200).json({ success: true, data: quotation, message: 'Customer response recorded.' });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/admin/quotations/:id
 */
exports.deleteQuotation = async (req, res, next) => {
  try {
    const quotation = await Quotation.findById(req.params.id);
    if (!quotation) {
      return res.status(404).json({ success: false, message: 'Quotation not found.' });
    }

    if (quotation.status !== 'draft') {
      return res.status(400).json({
        success: false,
        message: 'Only Draft quotations can be deleted. Please cancel issued quotations instead.',
      });
    }

    await Quotation.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Draft quotation deleted successfully.' });
  } catch (err) {
    next(err);
  }
};
