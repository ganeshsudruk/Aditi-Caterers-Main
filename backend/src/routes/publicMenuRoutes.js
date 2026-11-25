const express = require('express');
const router = express.Router();
const menuItemController = require('../controllers/menuItemController');
const menuService = require('../services/menuService');
const MenuCategory = require('../models/MenuCategory');
const FAQ = require('../models/FAQ');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const { isValidObjectId } = require('../utils/pagination');

// 1. Get published menu items (supports query: ?category=&search=&featured=&page=&limit=)
router.get('/', menuItemController.getPublicMenuItems);
router.get('/items', menuItemController.getPublicMenuItems);

// 2. Get active menu categories with published item counts
router.get('/categories', menuItemController.getPublicMenuCategories);

// 2b. Get single active menu category by slug or ID
router.get('/categories/:slug', asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const query = { status: 'active', isActive: true, deletedAt: null };
  if (isValidObjectId(slug)) {
    query._id = slug;
  } else {
    query.slug = slug.toLowerCase();
  }
  const cat = await MenuCategory.findOne(query).select('name slug description displayOrder').lean();
  if (!cat) {
    throw ApiError.notFound('Menu category not found');
  }
  res.status(200).json(new ApiResponse(200, { ...cat, id: cat._id }, 'Menu category retrieved successfully'));
}));

// 3. Get featured menu items
router.get('/featured', asyncHandler(async (req, res) => {
  const result = await menuService.getPublicMenuItems({ featured: true, limit: 12 });
  res.status(200).json(
    new ApiResponse(200, result.items, 'Featured menu items fetched successfully')
  );
}));

// 3b. Get published menu FAQs
router.get('/faqs', asyncHandler(async (req, res) => {
  const faqs = await FAQ.find({ isPublished: true, deletedAt: null })
    .sort({ displayOrder: 1 })
    .lean();
  res.status(200).json(new ApiResponse(200, faqs, 'Menu FAQs fetched successfully'));
}));

// 4. Get single published menu item by ID or slug
router.get('/items/:id', menuItemController.getPublicMenuItemById);
router.get('/:id', menuItemController.getPublicMenuItemById);

module.exports = router;
