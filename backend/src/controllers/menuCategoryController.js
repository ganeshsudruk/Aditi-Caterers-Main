const MenuCategory = require('../models/MenuCategory');
const MenuItem = require('../models/MenuItem');

/**
 * GET /api/admin/menu/categories
 */
exports.getAdminCategories = async (req, res, next) => {
  try {
    const categories = await MenuCategory.find().sort({ displayOrder: 1 }).lean();

    const counts = await Promise.all(
      categories.map((c) =>
        MenuItem.countDocuments({ categoryId: c._id, status: { $ne: 'archived' } })
      )
    );

    const enriched = categories.map((c, i) => ({
      ...c,
      id: c._id,
      itemCount: counts[i] || 0,
    }));

    res.status(200).json({
      success: true,
      data: {
        items: enriched,
        total: enriched.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/admin/menu/categories
 */
exports.createCategory = async (req, res, next) => {
  try {
    const { name, slug, description, displayOrder, status } = req.body;

    if (!name?.en || !name.en.trim()) {
      return res.status(400).json({ success: false, message: 'English category name is required.' });
    }

    const newCat = new MenuCategory({
      name,
      slug: slug || name.en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      description,
      displayOrder: parseInt(displayOrder, 10) || 1,
      status: status || 'active',
      createdBy: req.admin?._id,
    });

    await newCat.save();

    res.status(201).json({
      success: true,
      message: 'Category created successfully.',
      data: newCat,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT / PATCH /api/admin/menu/categories/:id
 */
exports.updateCategory = async (req, res, next) => {
  try {
    const cat = await MenuCategory.findById(req.params.id);
    if (!cat) {
      return res.status(404).json({ success: false, message: 'Category not found.' });
    }

    Object.assign(cat, req.body);
    cat.updatedBy = req.admin?._id;
    await cat.save();

    res.status(200).json({
      success: true,
      message: 'Category updated successfully.',
      data: cat,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/admin/menu/categories/:id/status
 */
exports.updateCategoryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const cat = await MenuCategory.findByIdAndUpdate(
      req.params.id,
      { status, updatedBy: req.admin?._id },
      { new: true }
    );
    if (!cat) {
      return res.status(404).json({ success: false, message: 'Category not found.' });
    }
    res.status(200).json({ success: true, message: `Category status updated to ${status}.`, data: cat });
  } catch (error) {
    next(error);
  }
};
