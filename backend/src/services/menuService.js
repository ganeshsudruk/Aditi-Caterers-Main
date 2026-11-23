const MenuItem = require('../models/MenuItem');
const MenuCategory = require('../models/MenuCategory');
const AuditLog = require('../models/AuditLog');
const ApiError = require('../utils/ApiError');
const { parsePaginationAndSort, isValidObjectId } = require('../utils/pagination');

/**
 * Public: Get published menu items
 */
const getPublicMenuItems = async (queryParams = {}) => {
  const { category, search, featured, lang } = queryParams;

  const query = {
    status: 'published',
    isActive: true,
    deletedAt: null,
  };

  // Filter by category (by ObjectId or slug)
  if (category && category !== 'all') {
    if (isValidObjectId(category)) {
      query.$or = [{ category: category }, { categoryId: category }];
    } else {
      const catDoc = await MenuCategory.findOne({
        $or: [{ slug: category }, { id: category }],
        deletedAt: null,
      }).lean();
      if (catDoc) {
        query.$or = [
          { category: catDoc._id },
          { categoryId: catDoc._id },
          { categoryId: category },
          { categoryId: catDoc.slug },
        ];
      } else {
        query.categoryId = category;
      }
    }
  }

  // Filter featured
  if (featured === 'true' || featured === true) {
    query.$or = [{ isFeatured: true }, { featured: true }];
  }

  // Search in en/mr names and descriptions
  if (search && search.trim()) {
    const q = search.trim();
    query.$or = [
      { 'name.en': { $regex: q, $options: 'i' } },
      { 'name.mr': { $regex: q, $options: 'i' } },
      { 'description.en': { $regex: q, $options: 'i' } },
      { 'description.mr': { $regex: q, $options: 'i' } },
      { slug: { $regex: q, $options: 'i' } },
    ];
  }

  const { page, limit, skip, sort } = parsePaginationAndSort(
    queryParams,
    ['displayOrder', 'createdAt', 'updatedAt', 'name.en', 'name.mr'],
    'displayOrder'
  );

  const [items, totalItems] = await Promise.all([
    MenuItem.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('category', 'name slug displayOrder')
      .select('-createdBy -updatedBy -__v -deletedAt')
      .lean(),
    MenuItem.countDocuments(query),
  ]);

  return {
    items,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit) || 1,
    },
  };
};

/**
 * Public: Get single published menu item
 */
const getPublicMenuItemById = async (idOrSlug) => {
  const query = {
    status: 'published',
    isActive: true,
    deletedAt: null,
  };

  if (isValidObjectId(idOrSlug)) {
    query._id = idOrSlug;
  } else {
    query.slug = idOrSlug;
  }

  const item = await MenuItem.findOne(query)
    .populate('category', 'name slug')
    .select('-createdBy -updatedBy -__v -deletedAt')
    .lean();

  if (!item) {
    throw ApiError.notFound('Menu item not found or is not currently published');
  }

  return item;
};

/**
 * Public: Get active menu categories with item counts
 */
const getPublicMenuCategories = async () => {
  const categories = await MenuCategory.find({
    status: 'active',
    isActive: true,
    deletedAt: null,
  })
    .sort({ displayOrder: 1, 'name.en': 1 })
    .select('name slug description displayOrder')
    .lean();

  // Attach published count
  const enriched = await Promise.all(
    categories.map(async (cat) => {
      const count = await MenuItem.countDocuments({
        $or: [{ category: cat._id }, { categoryId: cat._id }, { categoryId: cat.slug }],
        status: 'published',
        isActive: true,
        deletedAt: null,
      });
      return {
        ...cat,
        id: cat._id,
        itemCount: count,
      };
    })
  );

  return enriched;
};

/**
 * Admin: List menu items with comprehensive filters
 */
const getAdminMenuItems = async (queryParams = {}) => {
  const {
    search,
    category,
    categoryFilter,
    status,
    statusFilter,
    isActive,
    isFeatured,
    foodType,
    foodTypeFilter,
    sortBy,
  } = queryParams;

  const query = {
    deletedAt: null,
  };

  const catParam = category || categoryFilter;
  if (catParam && catParam !== 'all') {
    if (isValidObjectId(catParam)) {
      query.$or = [{ category: catParam }, { categoryId: catParam }];
    } else {
      query.categoryId = catParam;
    }
  }

  const stParam = status || statusFilter;
  if (stParam && stParam !== 'all') {
    query.status = stParam;
  }

  if (isActive !== undefined && isActive !== 'all') {
    query.isActive = isActive === 'true' || isActive === true;
  }

  if (isFeatured !== undefined && isFeatured !== 'all') {
    query.$or = [
      { isFeatured: isFeatured === 'true' || isFeatured === true },
      { featured: isFeatured === 'true' || isFeatured === true },
    ];
  }

  const ftParam = foodType || foodTypeFilter;
  if (ftParam && ftParam !== 'all') {
    query.foodType = ftParam;
  }

  if (search && search.trim()) {
    const q = search.trim();
    query.$or = [
      { 'name.en': { $regex: q, $options: 'i' } },
      { 'name.mr': { $regex: q, $options: 'i' } },
      { slug: { $regex: q, $options: 'i' } },
      { 'description.en': { $regex: q, $options: 'i' } },
      { 'description.mr': { $regex: q, $options: 'i' } },
    ];
  }

  let sort = { displayOrder: 1, createdAt: -1 };
  if (sortBy === 'name_asc') sort = { 'name.en': 1 };
  else if (sortBy === 'created_desc') sort = { createdAt: -1 };
  else if (sortBy === 'order_asc') sort = { displayOrder: 1 };

  const { page, limit, skip } = parsePaginationAndSort(
    queryParams,
    ['displayOrder', 'createdAt', 'updatedAt', 'name.en'],
    'displayOrder'
  );

  const [items, total, counts] = await Promise.all([
    MenuItem.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('category', 'name slug')
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .lean(),
    MenuItem.countDocuments(query),
    Promise.all([
      MenuItem.countDocuments({ status: 'published', deletedAt: null }),
      MenuItem.countDocuments({ status: 'draft', deletedAt: null }),
      MenuItem.countDocuments({ status: 'unpublished', deletedAt: null }),
      MenuItem.countDocuments({ status: 'archived', deletedAt: null }),
      MenuCategory.countDocuments({ deletedAt: null }),
    ]),
  ]);

  const [published, draft, unpublished, archived, totalCategories] = counts;

  return {
    items,
    pagination: {
      total,
      totalItems: total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    },
    counts: {
      total: published + draft + unpublished + archived,
      published,
      draft,
      unpublished,
      archived,
      totalCategories,
    },
  };
};

/**
 * Admin: Get single menu item by ID
 */
const getAdminMenuItemById = async (id) => {
  if (!isValidObjectId(id)) {
    throw ApiError.badRequest('Invalid menu item ID');
  }

  const item = await MenuItem.findOne({ _id: id, deletedAt: null })
    .populate('category')
    .populate('createdBy', 'name email')
    .populate('updatedBy', 'name email')
    .lean();

  if (!item) {
    throw ApiError.notFound('Menu item not found');
  }

  return item;
};

/**
 * Admin: Create menu item
 */
const createMenuItem = async (itemData, adminUser) => {
  const { name, category, categoryId, description, ingredients, foodType, dietaryType, image, displayOrder, isFeatured, featured, status, price } = itemData;

  if (!name?.en || !name.en.trim()) {
    throw ApiError.badRequest('English menu item name is required');
  }

  const slug =
    itemData.slug ||
    name.en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const targetCategory = category || categoryId;
  if (!targetCategory) {
    throw ApiError.badRequest('Category reference is required');
  }

  const adminId = isValidObjectId(adminUser?._id)
    ? adminUser._id
    : isValidObjectId(adminUser?.id)
    ? adminUser.id
    : null;

  const newItem = new MenuItem({
    name: {
      en: name.en.trim(),
      mr: name.mr ? name.mr.trim() : '',
    },
    slug,
    category: isValidObjectId(targetCategory) ? targetCategory : undefined,
    categoryId: targetCategory,
    description: description || { en: '', mr: '' },
    ingredients: ingredients || { en: [], mr: [] },
    foodType: foodType || (dietaryType === 'non_vegetarian' ? 'non-veg' : 'veg'),
    dietaryType: dietaryType || 'unspecified',
    image: image || { url: '', publicId: '', alt: { en: '', mr: '' } },
    displayOrder: parseInt(displayOrder, 10) || 0,
    isFeatured: !!(isFeatured || featured),
    featured: !!(isFeatured || featured),
    status: status || 'draft',
    price: price || undefined,
    createdBy: adminId,
    updatedBy: adminId,
  });

  await newItem.save();

  await AuditLog.create({
    actorId: adminUser?.id || null,
    action: 'menu.item_created',
    entityType: 'MenuItem',
    entityId: newItem._id,
    details: { name: newItem.name.en, slug: newItem.slug, status: newItem.status },
  }).catch(() => {});

  return newItem;
};

/**
 * Admin: Update menu item
 */
const updateMenuItem = async (id, updatePayload, adminUser) => {
  if (!isValidObjectId(id)) {
    throw ApiError.badRequest('Invalid menu item ID');
  }

  const item = await MenuItem.findOne({ _id: id, deletedAt: null });
  if (!item) {
    throw ApiError.notFound('Menu item not found');
  }

  // Prevent overwriting protected fields
  delete updatePayload._id;
  delete updatePayload.createdAt;
  delete updatePayload.createdBy;

  if (updatePayload.name) {
    if (updatePayload.name.en) item.name.en = updatePayload.name.en.trim();
    if (updatePayload.name.mr !== undefined) item.name.mr = updatePayload.name.mr.trim();
  }

  if (updatePayload.category || updatePayload.categoryId) {
    const cat = updatePayload.category || updatePayload.categoryId;
    item.categoryId = cat;
    if (isValidObjectId(cat)) item.category = cat;
  }

  if (updatePayload.description) item.description = updatePayload.description;
  if (updatePayload.ingredients) item.ingredients = updatePayload.ingredients;
  if (updatePayload.foodType) item.foodType = updatePayload.foodType;
  if (updatePayload.dietaryType) item.dietaryType = updatePayload.dietaryType;
  if (updatePayload.image) item.image = updatePayload.image;
  if (updatePayload.price !== undefined) item.price = updatePayload.price;
  if (updatePayload.displayOrder !== undefined) item.displayOrder = parseInt(updatePayload.displayOrder, 10);
  if (updatePayload.isFeatured !== undefined || updatePayload.featured !== undefined) {
    const val = !!(updatePayload.isFeatured !== undefined ? updatePayload.isFeatured : updatePayload.featured);
    item.isFeatured = val;
    item.featured = val;
  }
  if (updatePayload.status) item.status = updatePayload.status;

  item.updatedBy = adminUser?._id || adminUser?.id || null;
  await item.save();

  await AuditLog.create({
    actorId: adminUser?.id || null,
    action: 'menu.item_updated',
    entityType: 'MenuItem',
    entityId: item._id,
    details: { name: item.name.en },
  }).catch(() => {});

  return item;
};

/**
 * Admin: Update menu item publication status
 */
const updateMenuItemStatus = async (id, status, adminUser) => {
  if (!isValidObjectId(id)) {
    throw ApiError.badRequest('Invalid menu item ID');
  }

  const item = await MenuItem.findOne({ _id: id, deletedAt: null });
  if (!item) {
    throw ApiError.notFound('Menu item not found');
  }

  if (status === 'published' && (!item.name?.mr || !item.name.mr.trim())) {
    throw ApiError.badRequest('Marathi item name is required before publishing');
  }

  item.status = status;
  item.updatedBy = adminUser?._id || adminUser?.id || null;
  await item.save();

  await AuditLog.create({
    actorId: adminUser?.id || null,
    action: `menu.item_${status}`,
    entityType: 'MenuItem',
    entityId: item._id,
    details: { newStatus: status },
  }).catch(() => {});

  return item;
};

/**
 * Admin: Archive or soft delete menu item
 */
const archiveMenuItem = async (id, adminUser) => {
  if (!isValidObjectId(id)) {
    throw ApiError.badRequest('Invalid menu item ID');
  }

  const item = await MenuItem.findOne({ _id: id, deletedAt: null });
  if (!item) {
    throw ApiError.notFound('Menu item not found');
  }

  item.status = 'archived';
  item.isActive = false;
  item.deletedAt = new Date();
  item.updatedBy = adminUser?._id || adminUser?.id || null;
  await item.save();

  await AuditLog.create({
    actorId: adminUser?.id || null,
    action: 'menu.item_archived',
    entityType: 'MenuItem',
    entityId: item._id,
  }).catch(() => {});

  return { message: 'Menu item archived successfully' };
};

/**
 * Admin: Reorder multiple menu items
 */
const reorderMenuItems = async (orders = []) => {
  if (!Array.isArray(orders)) {
    throw ApiError.badRequest('Orders must be an array of { id, displayOrder }');
  }

  await Promise.all(
    orders.map((o) => {
      if (isValidObjectId(o.id)) {
        return MenuItem.findByIdAndUpdate(o.id, { displayOrder: o.displayOrder });
      }
      return null;
    })
  );

  return { message: 'Menu items reordered successfully' };
};

module.exports = {
  getPublicMenuItems,
  getPublicMenuItemById,
  getPublicMenuCategories,
  getAdminMenuItems,
  getAdminMenuItemById,
  createMenuItem,
  updateMenuItem,
  updateMenuItemStatus,
  archiveMenuItem,
  reorderMenuItems,
};
