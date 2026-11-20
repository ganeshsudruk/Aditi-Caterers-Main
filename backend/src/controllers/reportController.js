const Quotation = require('../models/Quotation');
const Customer = require('../models/Customer');
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const Package = require('../models/Package');
const MenuItem = require('../models/MenuItem');
const Gallery = require('../models/Gallery');
const Award = require('../models/Award');
const Review = require('../models/Review');

function buildDateFilter(startDate, endDate, dateField = 'createdAt') {
  const filter = {};
  if (startDate || endDate) {
    filter[dateField] = {};
    if (startDate) {
      filter[dateField].$gte = new Date(startDate);
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      filter[dateField].$lte = end;
    }
  }
  return filter;
}

// 1. GET /api/admin/reports/overview
exports.getOverviewReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const dateQuery = buildDateFilter(startDate, endDate, 'createdAt');

    // Counts across collections
    const [
      totalQuotations,
      issuedQuotations,
      acceptedQuotations,
      totalCustomers,
      totalReviews,
      totalAwards,
      totalGallery
    ] = await Promise.all([
      Quotation.countDocuments(dateQuery),
      Quotation.countDocuments({ ...dateQuery, status: 'issued' }),
      Quotation.countDocuments({ ...dateQuery, status: 'accepted' }),
      Customer.countDocuments(dateQuery),
      Review.countDocuments({ ...dateQuery, status: 'published' }),
      Award.countDocuments({ ...dateQuery, status: 'published' }),
      Gallery.countDocuments({ ...dateQuery, isPublished: true }),
    ]);

    // Sum accepted quotation value
    const acceptedValAgg = await Quotation.aggregate([
      { $match: { ...dateQuery, status: 'accepted' } },
      { $group: { _id: null, totalVal: { $sum: '$pricing.grandTotal' } } }
    ]);
    const acceptedQuotedValue = acceptedValAgg[0]?.totalVal || 0;

    // Booking counts if Booking exists
    let totalBookings = 0;
    let confirmedBookings = 0;
    let cancelledBookings = 0;
    let totalEnquiries = 0;
    try {
      totalBookings = await Booking.countDocuments({ ...dateQuery, isEnquiry: false });
      confirmedBookings = await Booking.countDocuments({ ...dateQuery, isEnquiry: false, status: 'confirmed' });
      cancelledBookings = await Booking.countDocuments({ ...dateQuery, isEnquiry: false, status: 'cancelled' });
      totalEnquiries = await Booking.countDocuments({ ...dateQuery, isEnquiry: true });
    } catch {
      // ignore if empty collection
    }

    res.json({
      success: true,
      message: 'Overview report generated successfully',
      data: {
        summary: {
          totalEnquiries,
          totalBookings,
          confirmedBookings,
          cancelledBookings,
          totalQuotations,
          issuedQuotations,
          acceptedQuotations,
          acceptedQuotedValue,
          totalCustomers,
          totalReviews,
          totalAwards,
          totalGallery,
        },
        filters: { startDate, endDate },
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('getOverviewReport error:', error);
    res.status(500).json({ success: false, message: 'Server error generating overview report' });
  }
};

// 2. GET /api/admin/reports/quotations
exports.getQuotationReport = async (req, res) => {
  try {
    const { startDate, endDate, status, serviceType, search, page = 1, limit = 25 } = req.query;
    const dateQuery = buildDateFilter(startDate, endDate, 'createdAt');

    const query = { ...dateQuery };
    if (status && status !== 'all') query.status = status;
    if (serviceType && serviceType !== 'all') query.serviceType = serviceType;
    if (search) {
      query.$or = [
        { quotationNumber: { $regex: search, $options: 'i' } },
        { 'customer.name': { $regex: search, $options: 'i' } },
        { 'customer.phone': { $regex: search, $options: 'i' } },
        { 'eventDetails.eventType': { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [records, totalRecords, statusCounts, aggVal] = await Promise.all([
      Quotation.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).lean(),
      Quotation.countDocuments(query),
      Quotation.aggregate([
        { $match: dateQuery },
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      Quotation.aggregate([
        { $match: { ...dateQuery, status: 'accepted' } },
        { $group: { _id: null, totalAcceptedValue: { $sum: '$pricing.grandTotal' }, totalQuotedValue: { $sum: '$pricing.grandTotal' } } }
      ])
    ]);

    const statusMap = statusCounts.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    res.json({
      success: true,
      message: 'Quotation report generated successfully',
      data: {
        summary: {
          total: totalRecords,
          draft: statusMap.draft || 0,
          issued: statusMap.issued || 0,
          accepted: statusMap.accepted || 0,
          rejected: statusMap.rejected || 0,
          revision_requested: statusMap.revision_requested || 0,
          expired: statusMap.expired || 0,
          cancelled: statusMap.cancelled || 0,
          acceptedQuotedValue: aggVal[0]?.totalAcceptedValue || 0,
        },
        records,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          totalRecords,
          totalPages: Math.ceil(totalRecords / Number(limit)),
        },
        filters: { startDate, endDate, status, serviceType },
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('getQuotationReport error:', error);
    res.status(500).json({ success: false, message: 'Server error generating quotation report' });
  }
};

// 3. GET /api/admin/reports/bookings
exports.getBookingReport = async (req, res) => {
  try {
    const { startDate, endDate, dateField = 'createdAt', status, serviceType, search, page = 1, limit = 25 } = req.query;
    const dateQuery = buildDateFilter(startDate, endDate, dateField);

    const query = { isEnquiry: false, ...dateQuery };
    if (status && status !== 'all') query.status = status;
    if (serviceType && serviceType !== 'all') query.serviceType = serviceType;
    if (search) {
      query.$or = [
        { bookingReference: { $regex: search, $options: 'i' } },
        { 'customerSnapshot.name': { $regex: search, $options: 'i' } },
        { 'customerSnapshot.phone': { $regex: search, $options: 'i' } },
        { 'eventDetails.eventType': { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [records, totalRecords, statusCounts] = await Promise.all([
      Booking.find(query).sort({ [dateField]: -1 }).skip(skip).limit(Number(limit)).lean(),
      Booking.countDocuments(query),
      Booking.aggregate([
        { $match: { isEnquiry: false, ...dateQuery } },
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ])
    ]);

    const statusMap = statusCounts.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    res.json({
      success: true,
      message: 'Booking report generated successfully',
      data: {
        summary: {
          total: totalRecords,
          pending_review: statusMap.pending_review || 0,
          contacted: statusMap.contacted || 0,
          quotation_sent: statusMap.quotation_sent || 0,
          confirmed: statusMap.confirmed || 0,
          completed: statusMap.completed || 0,
          cancelled: statusMap.cancelled || 0,
        },
        records,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          totalRecords,
          totalPages: Math.ceil(totalRecords / Number(limit)),
        },
        filters: { startDate, endDate, dateField, status, serviceType },
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('getBookingReport error:', error);
    res.status(500).json({ success: false, message: 'Server error generating booking report' });
  }
};

// 4. GET /api/admin/reports/enquiries
exports.getEnquiryReport = async (req, res) => {
  try {
    const { startDate, endDate, status, search, page = 1, limit = 25 } = req.query;
    const dateQuery = buildDateFilter(startDate, endDate, 'createdAt');

    const query = { isEnquiry: true, ...dateQuery };
    if (status && status !== 'all') query.status = status;
    if (search) {
      query.$or = [
        { bookingReference: { $regex: search, $options: 'i' } },
        { 'customerSnapshot.name': { $regex: search, $options: 'i' } },
        { 'customerSnapshot.phone': { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [records, totalRecords, statusCounts] = await Promise.all([
      Booking.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).lean(),
      Booking.countDocuments(query),
      Booking.aggregate([
        { $match: { isEnquiry: true, ...dateQuery } },
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ])
    ]);

    const statusMap = statusCounts.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    res.json({
      success: true,
      message: 'Enquiry report generated successfully',
      data: {
        summary: {
          total: totalRecords,
          pending: statusMap.pending_review || 0,
          contacted: statusMap.contacted || 0,
          quotation_sent: statusMap.quotation_sent || 0,
          converted: statusMap.confirmed || 0,
        },
        records,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          totalRecords,
          totalPages: Math.ceil(totalRecords / Number(limit)),
        },
        filters: { startDate, endDate, status },
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('getEnquiryReport error:', error);
    res.status(500).json({ success: false, message: 'Server error generating enquiry report' });
  }
};

// 5. GET /api/admin/reports/customers
exports.getCustomerReport = async (req, res) => {
  try {
    const { startDate, endDate, search, page = 1, limit = 25 } = req.query;
    const dateQuery = buildDateFilter(startDate, endDate, 'createdAt');

    const query = { ...dateQuery };
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [records, totalRecords] = await Promise.all([
      Customer.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).lean(),
      Customer.countDocuments(query),
    ]);

    res.json({
      success: true,
      message: 'Customer report generated successfully',
      data: {
        summary: {
          total: totalRecords,
        },
        records,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          totalRecords,
          totalPages: Math.ceil(totalRecords / Number(limit)),
        },
        filters: { startDate, endDate },
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('getCustomerReport error:', error);
    res.status(500).json({ success: false, message: 'Server error generating customer report' });
  }
};

// 6. GET /api/admin/reports/services
exports.getServicesReport = async (req, res) => {
  try {
    const [services, quotesByServiceType] = await Promise.all([
      Service.find({ status: 'active' }).lean(),
      Quotation.aggregate([
        { $group: { _id: '$serviceType', count: { $sum: 1 }, totalQuoted: { $sum: '$pricing.grandTotal' } } }
      ])
    ]);

    res.json({
      success: true,
      message: 'Services and event demand report generated',
      data: {
        services,
        serviceTypeDemand: quotesByServiceType,
        generatedAt: new Date().toISOString(),
      }
    });
  } catch (error) {
    console.error('getServicesReport error:', error);
    res.status(500).json({ success: false, message: 'Server error generating service report' });
  }
};

// 7. GET /api/admin/reports/content
exports.getContentReport = async (req, res) => {
  try {
    const [galleryCount, awardsCount, reviewsCount, activeServices, activePackages, activeMenuItems] = await Promise.all([
      Gallery.countDocuments({ isPublished: true }),
      Award.countDocuments({ status: 'published' }),
      Review.countDocuments({ status: 'published' }),
      Service.countDocuments({ status: 'active' }),
      Package.countDocuments({ status: 'active' }),
      MenuItem.countDocuments({ isAvailable: true }),
    ]);

    res.json({
      success: true,
      message: 'Content report generated',
      data: {
        galleryCount,
        awardsCount,
        reviewsCount,
        activeServices,
        activePackages,
        activeMenuItems,
        generatedAt: new Date().toISOString(),
      }
    });
  } catch (error) {
    console.error('getContentReport error:', error);
    res.status(500).json({ success: false, message: 'Server error generating content report' });
  }
};
