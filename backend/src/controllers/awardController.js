const Award = require('../models/Award');

const VALID_STATUSES = ['draft', 'published', 'unpublished', 'archived'];

/**
 * GET /api/admin/awards
 */
exports.getAdminAwards = async (req, res, next) => {
  try {
    const {
      search = '',
      statusFilter = 'all',
      categoryFilter = 'all',
      featuredFilter = 'all',
      sortBy = 'order_asc',
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};
    if (statusFilter !== 'all') query.status = statusFilter;
    if (categoryFilter !== 'all') query.category = categoryFilter;
    if (featuredFilter === 'featured') query.isFeatured = true;
    else if (featuredFilter === 'not_featured') query.isFeatured = false;

    if (search && search.trim()) {
      const q = new RegExp(search.trim(), 'i');
      query.$or = [
        { 'title.en': q },
        { 'title.mr': q },
        { issuingOrganization: q },
        { 'description.en': q },
      ];
    }

    let sortQuery = { displayOrder: 1 };
    if (sortBy === 'newest') sortQuery = { createdAt: -1 };
    else if (sortBy === 'oldest') sortQuery = { createdAt: 1 };
    else if (sortBy === 'updated_desc') sortQuery = { updatedAt: -1 };
    else if (sortBy === 'year_desc') sortQuery = { awardYear: -1 };

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const skip = (pageNum - 1) * limitNum;

    const [awards, total] = await Promise.all([
      Award.find(query).sort(sortQuery).skip(skip).limit(limitNum).lean(),
      Award.countDocuments(query),
    ]);

    const [published, draft, unpublished, archived] = await Promise.all([
      Award.countDocuments({ status: 'published' }),
      Award.countDocuments({ status: 'draft' }),
      Award.countDocuments({ status: 'unpublished' }),
      Award.countDocuments({ status: 'archived' }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        items: awards,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum) || 1,
        },
        counts: {
          total: published + draft + unpublished + archived,
          published,
          draft,
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
 * GET /api/admin/awards/:id
 */
exports.getAwardById = async (req, res, next) => {
  try {
    const award = await Award.findById(req.params.id).lean();
    if (!award) return res.status(404).json({ success: false, message: 'Award not found.' });
    res.status(200).json({ success: true, data: award });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/admin/awards
 */
exports.createAward = async (req, res, next) => {
  try {
    const {
      title, description, image, issuingOrganization,
      awardDate, awardYear, category, recipient,
      displayOrder, isFeatured, status,
    } = req.body;

    if (!title?.en) {
      return res.status(400).json({ success: false, message: 'English award title is required.' });
    }

    let order = displayOrder;
    if (!order) {
      const highest = await Award.findOne().sort({ displayOrder: -1 }).select('displayOrder').lean();
      order = (highest?.displayOrder || 0) + 1;
    }

    const award = await Award.create({
      title: { en: title.en.trim(), mr: (title.mr || '').trim() },
      description: { en: (description?.en || '').trim(), mr: (description?.mr || '').trim() },
      image: { url: (image?.url || '').trim(), publicId: image?.publicId || '' },
      issuingOrganization: (issuingOrganization || '').trim(),
      awardDate: awardDate || null,
      awardYear: awardYear ? parseInt(awardYear, 10) : null,
      category: category || 'other_recognition',
      recipient: (recipient || 'Aditi Caterers').trim(),
      displayOrder: parseInt(order, 10),
      isFeatured: !!isFeatured,
      status: status || 'draft',
    });

    res.status(201).json({ success: true, data: award });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/admin/awards/:id
 */
exports.updateAward = async (req, res, next) => {
  try {
    const award = await Award.findById(req.params.id);
    if (!award) return res.status(404).json({ success: false, message: 'Award not found.' });

    const {
      title, description, image, issuingOrganization,
      awardDate, awardYear, category, recipient,
      displayOrder, isFeatured, status,
    } = req.body;

    if (title?.en !== undefined) award.title.en = title.en.trim();
    if (title?.mr !== undefined) award.title.mr = title.mr.trim();
    if (description?.en !== undefined) award.description.en = description.en.trim();
    if (description?.mr !== undefined) award.description.mr = description.mr.trim();
    if (image?.url !== undefined) award.image.url = image.url.trim();
    if (image?.publicId !== undefined) award.image.publicId = image.publicId;
    if (issuingOrganization !== undefined) award.issuingOrganization = issuingOrganization.trim();
    if (awardDate !== undefined) award.awardDate = awardDate || null;
    if (awardYear !== undefined) award.awardYear = awardYear ? parseInt(awardYear, 10) : null;
    if (category !== undefined) award.category = category;
    if (recipient !== undefined) award.recipient = recipient.trim();
    if (displayOrder !== undefined) award.displayOrder = parseInt(displayOrder, 10);
    if (isFeatured !== undefined) award.isFeatured = !!isFeatured;
    if (status !== undefined) award.status = status;

    await award.save();
    res.status(200).json({ success: true, data: award });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/admin/awards/:id/status
 */
exports.updateAwardStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value.' });
    }
    const award = await Award.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).lean();
    if (!award) return res.status(404).json({ success: false, message: 'Award not found.' });
    res.status(200).json({ success: true, data: award });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/admin/awards/:id/order
 */
exports.updateAwardOrder = async (req, res, next) => {
  try {
    const { displayOrder } = req.body;
    const orderNum = parseInt(displayOrder, 10);
    if (isNaN(orderNum)) {
      return res.status(400).json({ success: false, message: 'Valid displayOrder is required.' });
    }
    const award = await Award.findByIdAndUpdate(
      req.params.id,
      { displayOrder: orderNum },
      { new: true }
    ).lean();
    if (!award) return res.status(404).json({ success: false, message: 'Award not found.' });
    res.status(200).json({ success: true, data: award });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/admin/awards/:id/featured
 */
exports.updateAwardFeatured = async (req, res, next) => {
  try {
    const { isFeatured } = req.body;
    const award = await Award.findByIdAndUpdate(
      req.params.id,
      { isFeatured: Boolean(isFeatured) },
      { new: true }
    ).lean();
    if (!award) return res.status(404).json({ success: false, message: 'Award not found.' });
    res.status(200).json({ success: true, data: award });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/admin/awards/:id/restore
 */
exports.restoreAward = async (req, res, next) => {
  try {
    const award = await Award.findByIdAndUpdate(
      req.params.id,
      { status: 'draft' },
      { new: true }
    ).lean();
    if (!award) return res.status(404).json({ success: false, message: 'Award not found.' });
    res.status(200).json({ success: true, data: award, message: 'Award restored as draft.' });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/admin/awards/reorder
 */
exports.reorderAwards = async (req, res, next) => {
  try {
    const { orders } = req.body;
    if (!Array.isArray(orders) || orders.length === 0) {
      return res.status(400).json({ success: false, message: 'orders array is required.' });
    }
    await Promise.all(
      orders.map(({ id, displayOrder }) =>
        Award.findByIdAndUpdate(id, { displayOrder: parseInt(displayOrder, 10) })
      )
    );
    res.status(200).json({ success: true, message: 'Award order updated.' });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/admin/awards/:id
 */
exports.deleteAward = async (req, res, next) => {
  try {
    const award = await Award.findByIdAndDelete(req.params.id).lean();
    if (!award) return res.status(404).json({ success: false, message: 'Award not found.' });
    res.status(200).json({ success: true, message: 'Award deleted permanently.' });
  } catch (err) {
    next(err);
  }
};

// ─── PUBLIC Endpoints ────────────────────────────────────────────────────────

/**
 * GET /api/public/awards
 */
exports.getPublicAwards = async (req, res, next) => {
  try {
    const { category, limit = 50 } = req.query;
    const query = { status: 'published' };
    if (category && category !== 'all') query.category = category;

    const awards = await Award.find(query)
      .sort({ displayOrder: 1 })
      .limit(parseInt(limit, 10))
      .select('-createdBy -updatedBy -image.publicId -__v')
      .lean();

    res.status(200).json({ success: true, data: awards });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/public/awards/featured
 */
exports.getPublicFeaturedAwards = async (req, res, next) => {
  try {
    const awards = await Award.find({ status: 'published', isFeatured: true })
      .sort({ displayOrder: 1 })
      .limit(10)
      .select('-createdBy -updatedBy -image.publicId -__v')
      .lean();
    res.status(200).json({ success: true, data: awards });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/public/awards/categories
 */
exports.getPublicAwardCategories = async (req, res, next) => {
  try {
    const categories = await Award.distinct('category', { status: 'published' });
    res.status(200).json({ success: true, data: categories });
  } catch (err) {
    next(err);
  }
};
