const Package = require('../models/Package');

/**
 * GET /api/admin/packages
 */
exports.getAdminPackages = async (req, res, next) => {
  try {
    const {
      search = '',
      statusFilter = 'all',
      serviceTypeFilter = 'all',
      sortBy = 'order_asc',
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (statusFilter !== 'all') query.status = statusFilter;
    if (serviceTypeFilter !== 'all') query.serviceTypes = serviceTypeFilter;

    if (search && search.trim()) {
      const q = new RegExp(search.trim(), 'i');
      query.$or = [{ 'name.en': q }, { 'name.mr': q }, { slug: q }];
    }

    let sortQuery = { displayOrder: 1 };
    if (sortBy === 'name_asc') sortQuery = { 'name.en': 1 };
    else if (sortBy === 'price_desc') sortQuery = { 'price.amount': -1 };
    else if (sortBy === 'price_asc') sortQuery = { 'price.amount': 1 };
    else if (sortBy === 'created_desc') sortQuery = { createdAt: -1 };

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const skip = (pageNum - 1) * limitNum;

    const [packages, total] = await Promise.all([
      Package.find(query).sort(sortQuery).skip(skip).limit(limitNum).lean(),
      Package.countDocuments(query),
    ]);

    const [published, draft, unpublished, archived] = await Promise.all([
      Package.countDocuments({ status: 'published' }),
      Package.countDocuments({ status: 'draft' }),
      Package.countDocuments({ status: 'unpublished' }),
      Package.countDocuments({ status: 'archived' }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        items: packages,
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
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/admin/packages/:id
 */
exports.getPackageById = async (req, res, next) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) return res.status(404).json({ success: false, message: 'Package not found.' });
    res.status(200).json({ success: true, data: pkg });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/admin/packages
 */
exports.createPackage = async (req, res, next) => {
  try {
    const {
      name,
      slug,
      shortDescription,
      description,
      guestCount,
      price,
      serviceTypes,
      eventTypes,
      menuSelections,
      inclusions,
      exclusions,
      notes,
      image,
      displayOrder,
      featured,
      status,
    } = req.body;

    if (!name?.en || !name.en.trim()) {
      return res.status(400).json({ success: false, message: 'English package name is required.' });
    }

    if (status === 'published' && (!name?.mr || !name.mr.trim())) {
      return res.status(400).json({ success: false, message: 'Marathi package name is required before publishing.' });
    }

    const newPackage = new Package({
      name,
      slug: slug || name.en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      shortDescription,
      description,
      guestCount,
      price,
      serviceTypes,
      eventTypes,
      menuSelections,
      inclusions,
      exclusions,
      notes,
      image,
      displayOrder: parseInt(displayOrder, 10) || 1,
      featured: !!featured,
      status: status || 'draft',
      createdBy: req.admin?._id,
    });

    await newPackage.save();

    res.status(201).json({
      success: true,
      message: 'Package created successfully.',
      data: newPackage,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT / PATCH /api/admin/packages/:id
 */
exports.updatePackage = async (req, res, next) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) return res.status(404).json({ success: false, message: 'Package not found.' });

    Object.assign(pkg, req.body);
    pkg.updatedBy = req.admin?._id;
    await pkg.save();

    res.status(200).json({
      success: true,
      message: 'Package updated successfully.',
      data: pkg,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/admin/packages/:id/status
 */
exports.updatePackageStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const pkg = await Package.findById(req.params.id);
    if (!pkg) return res.status(404).json({ success: false, message: 'Package not found.' });

    if (status === 'published' && (!pkg.name?.mr || !pkg.name.mr.trim())) {
      return res.status(400).json({ success: false, message: 'Marathi package name is required before publishing.' });
    }

    pkg.status = status;
    pkg.updatedBy = req.admin?._id;
    await pkg.save();

    res.status(200).json({
      success: true,
      message: `Package status updated to ${status}.`,
      data: pkg,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/admin/packages/reorder
 */
exports.reorderPackages = async (req, res, next) => {
  try {
    const { orders } = req.body;
    if (Array.isArray(orders)) {
      await Promise.all(
        orders.map((o) => Package.findByIdAndUpdate(o.id, { displayOrder: o.displayOrder }))
      );
    }
    res.status(200).json({ success: true, message: 'Packages reordered successfully.' });
  } catch (error) {
    next(error);
  }
};
