const Review = require('../models/Review');

const VALID_STATUSES = ['pending', 'approved', 'rejected', 'published', 'unpublished', 'archived'];

/**
 * GET /api/admin/reviews
 */
exports.getAdminReviews = async (req, res, next) => {
  try {
    const {
      search = '',
      statusFilter = 'all',
      ratingFilter = 'all',
      eventTypeFilter = 'all',
      sourceFilter = 'all',
      featuredFilter = 'all',
      sortBy = 'newest',
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (statusFilter !== 'all') query.status = statusFilter;
    if (eventTypeFilter !== 'all') query.eventType = eventTypeFilter;
    if (sourceFilter !== 'all') query.source = sourceFilter;
    if (featuredFilter === 'featured') query.isFeatured = true;
    else if (featuredFilter === 'not_featured') query.isFeatured = false;

    if (ratingFilter !== 'all') {
      if (ratingFilter === 'unrated') {
        query.$or = [{ rating: null }, { rating: { $exists: false } }];
      } else {
        query.rating = parseInt(ratingFilter, 10);
      }
    }

    if (search && search.trim()) {
      const q = new RegExp(search.trim(), 'i');
      query.$or = [
        { customerDisplayName: q },
        { 'reviewText.original': q },
        { 'reviewText.en': q },
        { 'reviewText.mr': q },
        { eventType: q },
        { source: q },
      ];
    }

    let sortQuery = { reviewDate: -1 };
    if (sortBy === 'oldest') sortQuery = { reviewDate: 1 };
    else if (sortBy === 'rating_desc') sortQuery = { rating: -1, reviewDate: -1 };
    else if (sortBy === 'rating_asc') sortQuery = { rating: 1, reviewDate: -1 };
    else if (sortBy === 'order_asc') sortQuery = { displayOrder: 1, reviewDate: -1 };
    else if (sortBy === 'updated_desc') sortQuery = { updatedAt: -1 };

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const skip = (pageNum - 1) * limitNum;

    const [reviews, total] = await Promise.all([
      Review.find(query).sort(sortQuery).skip(skip).limit(limitNum).lean(),
      Review.countDocuments(query),
    ]);

    const [pending, approved, published, rejected, unpublished, archived] = await Promise.all([
      Review.countDocuments({ status: 'pending' }),
      Review.countDocuments({ status: 'approved' }),
      Review.countDocuments({ status: 'published' }),
      Review.countDocuments({ status: 'rejected' }),
      Review.countDocuments({ status: 'unpublished' }),
      Review.countDocuments({ status: 'archived' }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        items: reviews,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum) || 1,
        },
        counts: {
          total: pending + approved + published + rejected + unpublished + archived,
          pending,
          approved,
          published,
          rejected,
          unpublished,
          archived,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/admin/reviews/:id
 */
exports.getReviewById = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id).lean();
    if (!review) return res.status(404).json({ success: false, message: 'Review not found.' });
    res.status(200).json({ success: true, data: review });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/admin/reviews
 */
exports.createReview = async (req, res, next) => {
  try {
    const {
      customerDisplayName,
      reviewText,
      rating,
      eventType,
      eventDate,
      reviewDate,
      source,
      sourceReference,
      consent,
      isFeatured,
      displayOrder,
      status,
      internalNotes,
    } = req.body;

    if (!reviewText?.original || !reviewText.original.trim()) {
      return res.status(400).json({ success: false, message: 'Original review text is required.' });
    }

    let targetStatus = status || 'pending';
    // Cannot be published without consent
    if (targetStatus === 'published' && !consent?.granted) {
      return res.status(400).json({
        success: false,
        message: 'Cannot publish review without confirmed customer consent.',
      });
    }

    let order = displayOrder;
    if (order === undefined || order === null || order === '') {
      const highest = await Review.findOne().sort({ displayOrder: -1 }).select('displayOrder').lean();
      order = (highest?.displayOrder || 0) + 1;
    }

    const review = await Review.create({
      customerDisplayName: (customerDisplayName || '').trim(),
      reviewText: {
        original: reviewText.original.trim(),
        originalLanguage: reviewText.originalLanguage || 'mr',
        en: (reviewText.en || '').trim(),
        mr: (reviewText.mr || '').trim(),
      },
      rating: rating ? parseInt(rating, 10) : null,
      eventType: (eventType || '').trim(),
      eventDate: eventDate || null,
      reviewDate: reviewDate || new Date(),
      source: source || 'whatsapp',
      sourceReference: (sourceReference || '').trim(),
      consent: {
        granted: Boolean(consent?.granted),
        grantedAt: consent?.granted ? (consent.grantedAt || new Date()) : null,
        displayNamePermission: consent?.displayNamePermission || 'full_name',
        evidenceReference: (consent?.evidenceReference || '').trim(),
      },
      isFeatured: Boolean(isFeatured),
      displayOrder: parseInt(order, 10),
      status: targetStatus,
      internalNotes: (internalNotes || '').trim(),
      publishedAt: targetStatus === 'published' ? new Date() : null,
      approvedAt: targetStatus === 'approved' || targetStatus === 'published' ? new Date() : null,
    });

    res.status(201).json({ success: true, data: review });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/admin/reviews/:id
 */
exports.updateReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found.' });

    const {
      customerDisplayName,
      reviewText,
      rating,
      eventType,
      eventDate,
      reviewDate,
      source,
      sourceReference,
      consent,
      isFeatured,
      displayOrder,
      status,
      internalNotes,
    } = req.body;

    if (customerDisplayName !== undefined) review.customerDisplayName = customerDisplayName.trim();
    if (reviewText) {
      if (reviewText.original !== undefined) review.reviewText.original = reviewText.original.trim();
      if (reviewText.originalLanguage !== undefined) review.reviewText.originalLanguage = reviewText.originalLanguage;
      if (reviewText.en !== undefined) review.reviewText.en = reviewText.en.trim();
      if (reviewText.mr !== undefined) review.reviewText.mr = reviewText.mr.trim();
    }
    if (rating !== undefined) review.rating = rating ? parseInt(rating, 10) : null;
    if (eventType !== undefined) review.eventType = eventType.trim();
    if (eventDate !== undefined) review.eventDate = eventDate || null;
    if (reviewDate !== undefined) review.reviewDate = reviewDate || review.reviewDate;
    if (source !== undefined) review.source = source;
    if (sourceReference !== undefined) review.sourceReference = sourceReference.trim();
    if (consent) {
      if (consent.granted !== undefined) review.consent.granted = Boolean(consent.granted);
      if (consent.grantedAt !== undefined) review.consent.grantedAt = consent.grantedAt;
      if (consent.displayNamePermission !== undefined) review.consent.displayNamePermission = consent.displayNamePermission;
      if (consent.evidenceReference !== undefined) review.consent.evidenceReference = consent.evidenceReference.trim();
    }
    if (isFeatured !== undefined) review.isFeatured = Boolean(isFeatured);
    if (displayOrder !== undefined) review.displayOrder = parseInt(displayOrder, 10);
    if (internalNotes !== undefined) review.internalNotes = internalNotes.trim();

    if (status !== undefined) {
      if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({ success: false, message: 'Invalid status value.' });
      }
      if (status === 'published' && !review.consent.granted) {
        return res.status(400).json({
          success: false,
          message: 'Cannot publish review without confirmed customer consent.',
        });
      }
      review.status = status;
      if (status === 'published' && !review.publishedAt) review.publishedAt = new Date();
      if (status === 'approved' && !review.approvedAt) review.approvedAt = new Date();
    }

    await review.save();
    res.status(200).json({ success: true, data: review });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/admin/reviews/:id/approve
 */
exports.approveReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status: 'approved', approvedAt: new Date() },
      { new: true }
    ).lean();
    if (!review) return res.status(404).json({ success: false, message: 'Review not found.' });
    res.status(200).json({ success: true, data: review, message: 'Review approved successfully.' });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/admin/reviews/:id/reject
 */
exports.rejectReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    ).lean();
    if (!review) return res.status(404).json({ success: false, message: 'Review not found.' });
    res.status(200).json({ success: true, data: review, message: 'Review rejected.' });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/admin/reviews/:id/status
 */
exports.updateReviewStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value.' });
    }

    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found.' });

    if (status === 'published' && !review.consent?.granted) {
      return res.status(400).json({
        success: false,
        message: 'Cannot publish review without confirmed customer consent.',
      });
    }

    review.status = status;
    if (status === 'published') review.publishedAt = new Date();
    if (status === 'approved' && !review.approvedAt) review.approvedAt = new Date();
    await review.save();

    res.status(200).json({ success: true, data: review });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/admin/reviews/:id/featured
 */
exports.updateReviewFeatured = async (req, res, next) => {
  try {
    const { isFeatured } = req.body;
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { isFeatured: Boolean(isFeatured) },
      { new: true }
    ).lean();
    if (!review) return res.status(404).json({ success: false, message: 'Review not found.' });
    res.status(200).json({ success: true, data: review });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/admin/reviews/:id/order
 */
exports.updateReviewOrder = async (req, res, next) => {
  try {
    const { displayOrder } = req.body;
    const orderNum = parseInt(displayOrder, 10);
    if (isNaN(orderNum)) {
      return res.status(400).json({ success: false, message: 'Valid displayOrder is required.' });
    }
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { displayOrder: orderNum },
      { new: true }
    ).lean();
    if (!review) return res.status(404).json({ success: false, message: 'Review not found.' });
    res.status(200).json({ success: true, data: review });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/admin/reviews/:id/restore
 */
exports.restoreReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status: 'pending' },
      { new: true }
    ).lean();
    if (!review) return res.status(404).json({ success: false, message: 'Review not found.' });
    res.status(200).json({ success: true, data: review, message: 'Review restored to Pending.' });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/admin/reviews/:id
 */
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id).lean();
    if (!review) return res.status(404).json({ success: false, message: 'Review not found.' });
    res.status(200).json({ success: true, message: 'Review permanently deleted.' });
  } catch (err) {
    next(err);
  }
};

// ─── PUBLIC Endpoints (published + consent.granted only) ──────────────────────

/**
 * GET /api/public/reviews
 */
exports.getPublicReviews = async (req, res, next) => {
  try {
    const { eventType, limit = 50 } = req.query;
    const query = { status: 'published', 'consent.granted': true };
    if (eventType && eventType !== 'all') query.eventType = eventType;

    const reviews = await Review.find(query)
      .sort({ displayOrder: 1, reviewDate: -1 })
      .limit(parseInt(limit, 10))
      .select('-internalNotes -sourceReference -consent.evidenceReference -createdBy -updatedBy -approvedBy -publishedBy -__v')
      .lean();

    const formatted = reviews.map((r) => {
      let displayName = r.customerDisplayName || 'Customer';
      if (r.consent?.displayNamePermission === 'first_name_only' && displayName) {
        displayName = displayName.split(' ')[0];
      } else if (r.consent?.displayNamePermission === 'anonymous') {
        displayName = 'Satisfied Client';
      }
      return {
        ...r,
        customerDisplayName: displayName,
      };
    });

    res.status(200).json({ success: true, data: formatted });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/public/reviews/featured
 */
exports.getPublicFeaturedReviews = async (req, res, next) => {
  try {
    const query = { status: 'published', isFeatured: true, 'consent.granted': true };
    const reviews = await Review.find(query)
      .sort({ displayOrder: 1, reviewDate: -1 })
      .limit(10)
      .select('-internalNotes -sourceReference -consent.evidenceReference -createdBy -updatedBy -approvedBy -publishedBy -__v')
      .lean();

    const formatted = reviews.map((r) => {
      let displayName = r.customerDisplayName || 'Customer';
      if (r.consent?.displayNamePermission === 'first_name_only' && displayName) {
        displayName = displayName.split(' ')[0];
      } else if (r.consent?.displayNamePermission === 'anonymous') {
        displayName = 'Satisfied Client';
      }
      return {
        ...r,
        customerDisplayName: displayName,
      };
    });

    res.status(200).json({ success: true, data: formatted });
  } catch (err) {
    next(err);
  }
};
