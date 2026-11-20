const Customer = require('../models/Customer');
const Booking = require('../models/Booking');

/**
 * Helper to normalize phone
 */
function normalizePhone(rawPhone) {
  if (!rawPhone) return '';
  let digits = String(rawPhone).replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    digits = digits.slice(2);
  }
  return digits;
}

/**
 * GET /api/admin/customers
 * List customers with search, filters, sorting and pagination
 */
exports.getCustomers = async (req, res, next) => {
  try {
    const {
      search = '',
      bookingFilter = 'all',
      archiveFilter = 'active',
      sortBy = 'created_desc',
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    // Archive filter
    if (archiveFilter === 'active') {
      query.isArchived = false;
    } else if (archiveFilter === 'archived') {
      query.isArchived = true;
    }

    // Search filter
    if (search && search.trim()) {
      const cleanSearch = search.trim();
      const cleanPhone = cleanSearch.replace(/\D/g, '');
      const searchRegex = new RegExp(cleanSearch, 'i');

      query.$or = [
        { name: searchRegex },
        { email: searchRegex },
        ...(cleanPhone ? [{ normalizedPhone: new RegExp(cleanPhone) }] : []),
      ];
    }

    // Sorting
    let sortQuery = { createdAt: -1 };
    if (sortBy === 'created_asc') {
      sortQuery = { createdAt: 1 };
    } else if (sortBy === 'name_asc') {
      sortQuery = { name: 1 };
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const skip = (pageNum - 1) * limitNum;

    const [customers, total] = await Promise.all([
      Customer.find(query).sort(sortQuery).skip(skip).limit(limitNum).lean(),
      Customer.countDocuments(query),
    ]);

    // Counts summary
    const [totalActive, totalArchived] = await Promise.all([
      Customer.countDocuments({ isArchived: false }),
      Customer.countDocuments({ isArchived: true }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        items: customers,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum) || 1,
        },
        counts: {
          total: totalActive + totalArchived,
          active: totalActive,
          archived: totalArchived,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/admin/customers/:id
 * Get single customer profile with linked booking history
 */
exports.getCustomerById = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id).lean();
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found.',
      });
    }

    // Fetch linked bookings by customerId or matching phone/email
    let linkedBookings = [];
    try {
      linkedBookings = await Booking.find({
        $or: [
          { customerId: customer._id },
          ...(customer.phone ? [{ 'customer.mobile': customer.phone }] : []),
          ...(customer.email ? [{ 'customer.email': customer.email }] : []),
        ],
      })
        .sort({ 'event.date': -1, createdAt: -1 })
        .lean();
    } catch {
      // If Booking model has no records or query fails
    }

    res.status(200).json({
      success: true,
      data: {
        ...customer,
        id: customer._id,
        totalBookings: linkedBookings.length,
        bookings: linkedBookings,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/admin/customers
 * Create a new customer
 */
exports.createCustomer = async (req, res, next) => {
  try {
    const { name, phone, email, address, preferredLanguage, initialNote } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Customer name is required.' });
    }
    if (!phone || !phone.trim()) {
      return res.status(400).json({ success: false, message: 'Phone number is required.' });
    }

    const normPhone = normalizePhone(phone);

    const notes = [];
    if (initialNote && initialNote.trim()) {
      notes.push({
        message: initialNote.trim(),
        author: req.admin?.name || 'Administrator',
      });
    }

    const newCustomer = new Customer({
      name: name.trim(),
      phone: phone.trim(),
      normalizedPhone: normPhone,
      email: (email || '').trim().toLowerCase(),
      address: (address || '').trim(),
      preferredLanguage: preferredLanguage || 'mr',
      notes,
    });

    await newCustomer.save();

    res.status(201).json({
      success: true,
      message: 'Customer created successfully.',
      data: newCustomer,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT / PATCH /api/admin/customers/:id
 * Update customer details
 */
exports.updateCustomer = async (req, res, next) => {
  try {
    const { name, phone, email, address, preferredLanguage } = req.body;
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found.' });
    }

    if (name) customer.name = name.trim();
    if (phone) {
      customer.phone = phone.trim();
      customer.normalizedPhone = normalizePhone(phone);
    }
    if (email !== undefined) customer.email = (email || '').trim().toLowerCase();
    if (address !== undefined) customer.address = (address || '').trim();
    if (preferredLanguage) customer.preferredLanguage = preferredLanguage;

    await customer.save();

    res.status(200).json({
      success: true,
      message: 'Customer updated successfully.',
      data: customer,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/admin/customers/:id/archive
 */
exports.archiveCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { isArchived: true },
      { new: true }
    );
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found.' });
    }
    res.status(200).json({
      success: true,
      message: 'Customer archived successfully.',
      data: customer,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/admin/customers/:id/restore
 */
exports.restoreCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { isArchived: false },
      { new: true }
    );
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found.' });
    }
    res.status(200).json({
      success: true,
      message: 'Customer restored successfully.',
      data: customer,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/admin/customers/:id/notes
 * Add internal note
 */
exports.addCustomerNote = async (req, res, next) => {
  try {
    const { message } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Note message is required.' });
    }

    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found.' });
    }

    const note = {
      message: message.trim(),
      author: req.admin?.name || 'Administrator',
      createdAt: new Date(),
    };

    customer.notes.unshift(note);
    await customer.save();

    res.status(201).json({
      success: true,
      message: 'Note added successfully.',
      data: note,
    });
  } catch (error) {
    next(error);
  }
};
