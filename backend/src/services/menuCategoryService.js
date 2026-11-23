const MenuCategory = require('../models/MenuCategory');
const MenuItem = require('../models/MenuItem');
const AuditLog = require('../models/AuditLog');
const ApiError = require('../utils/ApiError');
const { isValidObjectId } = require('../utils/pagination');

/**
 * Admin: Get all categories with item counts
 */
const getAdminCategories = async () => {
  const categories = await MenuCategory.find({ deletedAt: null })
    .sort({ displayOrder: 1, 'name.en': 1 })
    .lean();

  const enriched = await Promise.all(
    categories.map(async (cat) => {
      const itemCount = await MenuItem.countDocuments({
        $or: [{ category: cat._id }, { categoryId: cat._id }, { categoryId: cat.slug }],
        deletedAt: null,
      });
      return {
        ...cat,
        id: cat._id,
        itemCount,
      };
    })
  );

  return {
    items: enriched,
    total: enriched.length,
  };
};

/**
 * Admin: Create category
 */
const createCategory = async (categoryData, adminUser) => {
  const { name, slug, description, displayOrder, status } = categoryData;

  if (!name?.en || !name.en.trim()) {
    throw ApiError.badRequest('English category name is required');
  }

  const categorySlug =
    slug || name.en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const existing = await MenuCategory.findOne({
    slug: categorySlug,
    deletedAt: null,
  });

  if (existing) {
    throw ApiError.conflict(`A category with slug '${categorySlug}' already exists`);
  }

  const adminId = isValidObjectId(adminUser?._id)
    ? adminUser._id
    : isValidObjectId(adminUser?.id)
    ? adminUser.id
    : null;

  const newCategory = new MenuCategory({
    name: {
      en: name.en.trim(),
      mr: name.mr ? name.mr.trim() : '',
    },
    slug: categorySlug,
    description: description || { en: '', mr: '' },
    displayOrder: parseInt(displayOrder, 10) || 0,
    status: status || 'active',
    createdBy: adminId,
    updatedBy: adminId,
  });

  await newCategory.save();

  await AuditLog.create({
    actorId: adminUser?.id || null,
    action: 'menu.category_created',
    entityType: 'MenuCategory',
    entityId: newCategory._id,
    details: { name: newCategory.name.en, slug: newCategory.slug },
  }).catch(() => {});

  return newCategory;
};

/**
 * Admin: Update category
 */
const updateCategory = async (id, updatePayload, adminUser) => {
  if (!isValidObjectId(id)) {
    throw ApiError.badRequest('Invalid category ID');
  }

  const category = await MenuCategory.findOne({ _id: id, deletedAt: null });
  if (!category) {
    throw ApiError.notFound('Category not found');
  }

  if (updatePayload.name) {
    if (updatePayload.name.en) category.name.en = updatePayload.name.en.trim();
    if (updatePayload.name.mr !== undefined) category.name.mr = updatePayload.name.mr.trim();
  }

  if (updatePayload.description) category.description = updatePayload.description;
  if (updatePayload.displayOrder !== undefined) category.displayOrder = parseInt(updatePayload.displayOrder, 10);
  if (updatePayload.status) category.status = updatePayload.status;

  category.updatedBy = adminUser?._id || adminUser?.id || null;
  await category.save();

  await AuditLog.create({
    actorId: adminUser?.id || null,
    action: 'menu.category_updated',
    entityType: 'MenuCategory',
    entityId: category._id,
    details: { name: category.name.en },
  }).catch(() => {});

  return category;
};

/**
 * Admin: Update category status
 */
const updateCategoryStatus = async (id, status, adminUser) => {
  if (!isValidObjectId(id)) {
    throw ApiError.badRequest('Invalid category ID');
  }

  const category = await MenuCategory.findOne({ _id: id, deletedAt: null });
  if (!category) {
    throw ApiError.notFound('Category not found');
  }

  category.status = status;
  category.updatedBy = adminUser?._id || adminUser?.id || null;
  await category.save();

  await AuditLog.create({
    actorId: adminUser?.id || null,
    action: `menu.category_status_${status}`,
    entityType: 'MenuCategory',
    entityId: category._id,
  }).catch(() => {});

  return category;
};

/**
 * Admin: Delete or soft-archive category
 */
const deleteCategory = async (id, adminUser) => {
  if (!isValidObjectId(id)) {
    throw ApiError.badRequest('Invalid category ID');
  }

  const category = await MenuCategory.findOne({ _id: id, deletedAt: null });
  if (!category) {
    throw ApiError.notFound('Category not found');
  }

  // Check if any active menu items still reference this category
  const activeItemsCount = await MenuItem.countDocuments({
    $or: [{ category: category._id }, { categoryId: category._id }, { categoryId: category.slug }],
    deletedAt: null,
  });

  if (activeItemsCount > 0) {
    throw ApiError.badRequest(
      `Cannot delete category '${category.name.en}' because ${activeItemsCount} menu item(s) are still assigned to it. Please reassign or archive those items first.`
    );
  }

  category.status = 'archived';
  category.isActive = false;
  category.deletedAt = new Date();
  category.updatedBy = adminUser?._id || adminUser?.id || null;
  await category.save();

  await AuditLog.create({
    actorId: adminUser?.id || null,
    action: 'menu.category_deleted',
    entityType: 'MenuCategory',
    entityId: category._id,
  }).catch(() => {});

  return { message: 'Category archived successfully' };
};

/**
 * Admin: Reorder categories
 */
const reorderCategories = async (items = []) => {
  if (!Array.isArray(items)) {
    throw ApiError.badRequest('Items must be an array of { id, displayOrder }');
  }

  await Promise.all(
    items.map((item) => {
      if (isValidObjectId(item.id)) {
        return MenuCategory.findByIdAndUpdate(item.id, { displayOrder: item.displayOrder });
      }
      return null;
    })
  );

  return { message: 'Categories reordered successfully' };
};

module.exports = {
  getAdminCategories,
  createCategory,
  updateCategory,
  updateCategoryStatus,
  deleteCategory,
  reorderCategories,
};
