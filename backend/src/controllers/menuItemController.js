const MenuItem = require('../models/MenuItem');
const MenuCategory = require('../models/MenuCategory');

/**
 * GET /api/admin/menu/items
 */
exports.getAdminMenuItems = async (req, res, next) => {
  try {
    const {
      search = '',
      categoryFilter = 'all',
      statusFilter = 'all',
      foodTypeFilter = 'all',
      sortBy = 'order_asc',
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (statusFilter !== 'all') query.status = statusFilter;
    if (categoryFilter !== 'all') query.categoryId = categoryFilter;
    if (foodTypeFilter !== 'all') query.foodType = foodTypeFilter;

    if (search && search.trim()) {
      const q = new RegExp(search.trim(), 'i');
      query.$or = [{ 'name.en': q }, { 'name.mr': q }, { slug: q }];
    }

    let sortQuery = { displayOrder: 1 };
    if (sortBy === 'name_asc') sortQuery = { 'name.en': 1 };
    else if (sortBy === 'created_desc') sortQuery = { createdAt: -1 };

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const skip = (pageNum - 1) * limitNum;

    const [items, total] = await Promise.all([
      MenuItem.find(query).sort(sortQuery).skip(skip).limit(limitNum).lean(),
      MenuItem.countDocuments(query),
    ]);

    const [published, draft, unpublished, archived, totalCategories] = await Promise.all([
      MenuItem.countDocuments({ status: 'published' }),
      MenuItem.countDocuments({ status: 'draft' }),
      MenuItem.countDocuments({ status: 'unpublished' }),
      MenuItem.countDocuments({ status: 'archived' }),
      MenuCategory.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      data: {
        items,
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
          totalCategories,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/admin/menu/items
 */
exports.createMenuItem = async (req, res, next) => {
  try {
    const { name, categoryId, description, ingredients, foodType, image, displayOrder, featured, status, slug } = req.body;

    if (!name?.en || !name.en.trim()) {
      return res.status(400).json({ success: false, message: 'English dish name is required.' });
    }

    if (status === 'published' && (!name?.mr || !name.mr.trim())) {
      return res.status(400).json({ success: false, message: 'Marathi dish name is required before publishing.' });
    }

    const newItem = new MenuItem({
      name,
      categoryId,
      slug: slug || name.en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      description,
      ingredients,
      foodType: foodType || 'veg',
      image,
      displayOrder: parseInt(displayOrder, 10) || 1,
      featured: !!featured,
      status: status || 'draft',
      createdBy: req.admin?._id,
    });

    await newItem.save();

    res.status(201).json({
      success: true,
      message: 'Menu item created successfully.',
      data: newItem,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT / PATCH /api/admin/menu/items/:id
 */
exports.updateMenuItem = async (req, res, next) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Menu item not found.' });
    }

    Object.assign(item, req.body);
    item.updatedBy = req.admin?._id;
    await item.save();

    res.status(200).json({
      success: true,
      message: 'Menu item updated successfully.',
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/admin/menu/items/:id/status
 */
exports.updateMenuItemStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Menu item not found.' });
    }

    if (status === 'published' && (!item.name?.mr || !item.name.mr.trim())) {
      return res.status(400).json({ success: false, message: 'Marathi dish name is required before publishing.' });
    }

    item.status = status;
    item.updatedBy = req.admin?._id;
    await item.save();

    res.status(200).json({
      success: true,
      message: `Menu item status updated to ${status}.`,
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/admin/menu/items/reorder
 */
exports.reorderMenuItems = async (req, res, next) => {
  try {
    const { orders } = req.body;
    if (Array.isArray(orders)) {
      await Promise.all(
        orders.map((o) => MenuItem.findByIdAndUpdate(o.id, { displayOrder: o.displayOrder }))
      );
    }
    res.status(200).json({ success: true, message: 'Menu items reordered successfully.' });
  } catch (error) {
    next(error);
  }
};
