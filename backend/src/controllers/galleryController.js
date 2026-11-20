const Gallery = require('../models/Gallery');

/**
 * GET /api/admin/gallery
 * List gallery photos with search, filters, sorting, and pagination.
 */
exports.getAdminGallery = async (req, res, next) => {
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
      query.$or = [{ 'title.en': q }, { 'title.mr': q }, { eventType: q }, { category: q }];
    }

    let sortQuery = { displayOrder: 1 };
    if (sortBy === 'newest') sortQuery = { createdAt: -1 };
    else if (sortBy === 'oldest') sortQuery = { createdAt: 1 };
    else if (sortBy === 'updated_desc') sortQuery = { updatedAt: -1 };

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const skip = (pageNum - 1) * limitNum;

    const [photos, total] = await Promise.all([
      Gallery.find(query).sort(sortQuery).skip(skip).limit(limitNum).lean(),
      Gallery.countDocuments(query),
    ]);

    const [published, draft, unpublished, archived] = await Promise.all([
      Gallery.countDocuments({ status: 'published' }),
      Gallery.countDocuments({ status: 'draft' }),
      Gallery.countDocuments({ status: 'unpublished' }),
      Gallery.countDocuments({ status: 'archived' }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        items: photos,
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
 * GET /api/admin/gallery/:id
 */
exports.getGalleryById = async (req, res, next) => {
  try {
    const photo = await Gallery.findById(req.params.id).lean();
    if (!photo) {
      return res.status(404).json({ success: false, message: 'Gallery photo not found.' });
    }
    res.status(200).json({ success: true, data: photo });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/admin/gallery
 */
exports.createGalleryPhoto = async (req, res, next) => {
  try {
    const {
      image,
      title,
      altText,
      category,
      eventType,
      displayOrder,
      isFeatured,
      status,
    } = req.body;

    if (!image?.url) {
      return res.status(400).json({ success: false, message: 'Image URL is required.' });
    }
    if (!title?.en) {
      return res.status(400).json({ success: false, message: 'English title is required.' });
    }

    // Auto-assign display order if not provided
    let order = displayOrder;
    if (!order) {
      const highest = await Gallery.findOne().sort({ displayOrder: -1 }).select('displayOrder').lean();
      order = (highest?.displayOrder || 0) + 1;
    }

    const photo = await Gallery.create({
      image: { url: image.url.trim(), publicId: image.publicId || '' },
      title: { en: title.en.trim(), mr: (title.mr || '').trim() },
      altText: {
        en: (altText?.en || title.en).trim(),
        mr: (altText?.mr || title.mr || '').trim(),
      },
      category: category || 'other',
      eventType: (eventType || category || 'other').trim(),
      displayOrder: parseInt(order, 10),
      isFeatured: !!isFeatured,
      status: status || 'draft',
    });

    res.status(201).json({ success: true, data: photo });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/admin/gallery/:id
 */
exports.updateGalleryPhoto = async (req, res, next) => {
  try {
    const {
      image,
      title,
      altText,
      category,
      eventType,
      displayOrder,
      isFeatured,
      status,
    } = req.body;

    const photo = await Gallery.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({ success: false, message: 'Gallery photo not found.' });
    }

    if (image?.url !== undefined) photo.image.url = image.url.trim();
    if (image?.publicId !== undefined) photo.image.publicId = image.publicId;
    if (title?.en !== undefined) photo.title.en = title.en.trim();
    if (title?.mr !== undefined) photo.title.mr = title.mr.trim();
    if (altText?.en !== undefined) photo.altText.en = altText.en.trim();
    if (altText?.mr !== undefined) photo.altText.mr = altText.mr.trim();
    if (category !== undefined) photo.category = category;
    if (eventType !== undefined) photo.eventType = eventType.trim();
    if (displayOrder !== undefined) photo.displayOrder = parseInt(displayOrder, 10);
    if (isFeatured !== undefined) photo.isFeatured = !!isFeatured;
    if (status !== undefined) photo.status = status;

    await photo.save();
    res.status(200).json({ success: true, data: photo });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/admin/gallery/:id/status
 */
exports.updateGalleryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowed = ['draft', 'published', 'unpublished', 'archived'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value.' });
    }

    const photo = await Gallery.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).lean();

    if (!photo) {
      return res.status(404).json({ success: false, message: 'Gallery photo not found.' });
    }

    res.status(200).json({ success: true, data: photo });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/admin/gallery/reorder
 */
exports.reorderGallery = async (req, res, next) => {
  try {
    const { orders } = req.body;
    if (!Array.isArray(orders) || orders.length === 0) {
      return res.status(400).json({ success: false, message: 'orders array is required.' });
    }

    await Promise.all(
      orders.map(({ id, displayOrder }) =>
        Gallery.findByIdAndUpdate(id, { displayOrder: parseInt(displayOrder, 10) })
      )
    );

    res.status(200).json({ success: true, message: 'Gallery order updated.' });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/admin/gallery/:id
 */
exports.deleteGalleryPhoto = async (req, res, next) => {
  try {
    const photo = await Gallery.findByIdAndDelete(req.params.id).lean();
    if (!photo) {
      return res.status(404).json({ success: false, message: 'Gallery photo not found.' });
    }
    res.status(200).json({ success: true, message: 'Gallery photo deleted permanently.' });
  } catch (err) {
    next(err);
  }
};

// ─── PUBLIC Endpoints ─────────────────────────────────────────────────────────

/**
 * GET /api/public/gallery
 */
exports.getPublicGallery = async (req, res, next) => {
  try {
    const { category, isFeatured, search, limit = 50 } = req.query;

    const query = { status: 'published' };
    if (category && category !== 'all') query.category = category;
    if (isFeatured === 'true') query.isFeatured = true;
    if (search && search.trim()) {
      const q = new RegExp(search.trim(), 'i');
      query.$or = [{ 'title.en': q }, { 'title.mr': q }, { eventType: q }];
    }

    const photos = await Gallery.find(query)
      .sort({ displayOrder: 1 })
      .limit(parseInt(limit, 10))
      .lean();

    res.status(200).json({ success: true, data: photos });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/public/gallery/categories
 */
exports.getPublicGalleryCategories = async (req, res, next) => {
  try {
    const categories = await Gallery.distinct('category', { status: 'published' });
    res.status(200).json({ success: true, data: categories });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/public/gallery/:id
 */
exports.getPublicGalleryById = async (req, res, next) => {
  try {
    const photo = await Gallery.findOne({ _id: req.params.id, status: 'published' }).lean();
    if (!photo) {
      return res.status(404).json({ success: false, message: 'Gallery photo not found.' });
    }
    res.status(200).json({ success: true, data: photo });
  } catch (err) {
    next(err);
  }
};
