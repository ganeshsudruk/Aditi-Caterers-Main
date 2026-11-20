const Service = require('../models/Service');

/**
 * GET /api/admin/services
 * List services for Admin with filters, search, sorting and pagination
 */
exports.getAdminServices = async (req, res, next) => {
  try {
    const {
      search = '',
      statusFilter = 'all',
      sortBy = 'order_asc',
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (statusFilter !== 'all') {
      query.status = statusFilter;
    }

    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { 'name.en': searchRegex },
        { 'name.mr': searchRegex },
        { slug: searchRegex },
      ];
    }

    let sortQuery = { displayOrder: 1 };
    if (sortBy === 'name_asc') sortQuery = { 'name.en': 1 };
    else if (sortBy === 'created_desc') sortQuery = { createdAt: -1 };
    else if (sortBy === 'updated_desc') sortQuery = { updatedAt: -1 };

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const skip = (pageNum - 1) * limitNum;

    const [services, total] = await Promise.all([
      Service.find(query).sort(sortQuery).skip(skip).limit(limitNum).lean(),
      Service.countDocuments(query),
    ]);

    const [published, draft, unpublished, archived] = await Promise.all([
      Service.countDocuments({ status: 'published' }),
      Service.countDocuments({ status: 'draft' }),
      Service.countDocuments({ status: 'unpublished' }),
      Service.countDocuments({ status: 'archived' }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        items: services,
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
 * GET /api/admin/services/:id
 */
exports.getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/admin/services
 */
exports.createService = async (req, res, next) => {
  try {
    const { name, shortDescription, description, highlights, image, displayOrder, status, slug } = req.body;

    if (!name?.en || !name.en.trim()) {
      return res.status(400).json({ success: false, message: 'English service name is required.' });
    }

    if (status === 'published' && (!name?.mr || !name.mr.trim())) {
      return res.status(400).json({ success: false, message: 'Marathi service name is required before publishing.' });
    }

    const newService = new Service({
      name,
      slug: slug || name.en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      shortDescription,
      description,
      highlights,
      image,
      displayOrder: parseInt(displayOrder, 10) || 1,
      status: status || 'draft',
      createdBy: req.admin?._id,
    });

    await newService.save();

    res.status(201).json({
      success: true,
      message: 'Service created successfully.',
      data: newService,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT / PATCH /api/admin/services/:id
 */
exports.updateService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }

    Object.assign(service, req.body);
    service.updatedBy = req.admin?._id;

    await service.save();

    res.status(200).json({
      success: true,
      message: 'Service updated successfully.',
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/admin/services/:id/status
 */
exports.updateServiceStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }

    if (status === 'published' && (!service.name?.mr || !service.name.mr.trim())) {
      return res.status(400).json({ success: false, message: 'Marathi service name is required before publishing.' });
    }

    service.status = status;
    service.updatedBy = req.admin?._id;
    await service.save();

    res.status(200).json({
      success: true,
      message: `Service status changed to ${status}.`,
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/admin/services/reorder
 */
exports.reorderServices = async (req, res, next) => {
  try {
    const { orders } = req.body; // [{ id, displayOrder }]
    if (Array.isArray(orders)) {
      await Promise.all(
        orders.map((o) =>
          Service.findByIdAndUpdate(o.id, { displayOrder: o.displayOrder, updatedBy: req.admin?._id })
        )
      );
    }
    res.status(200).json({ success: true, message: 'Services reordered successfully.' });
  } catch (error) {
    next(error);
  }
};

/**
 * Public Endpoint: GET /api/public/services
 * Returns ONLY published services
 */
exports.getPublicServices = async (req, res, next) => {
  try {
    const services = await Service.find({ status: 'published' })
      .sort({ displayOrder: 1 })
      .select('-createdBy -updatedBy')
      .lean();

    res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Public Endpoint: GET /api/public/services/:slug
 */
exports.getPublicServiceBySlug = async (req, res, next) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug, status: 'published' })
      .select('-createdBy -updatedBy')
      .lean();

    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found or unpublished.' });
    }

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    next(error);
  }
};
