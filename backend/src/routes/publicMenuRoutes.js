const express = require('express');
const router = express.Router();
const menuItemController = require('../controllers/menuItemController');
const menuService = require('../services/menuService');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

// 1. Get published menu items (supports query: ?category=&search=&featured=&page=&limit=)
router.get('/', menuItemController.getPublicMenuItems);
router.get('/items', menuItemController.getPublicMenuItems);

// 2. Get active menu categories with published item counts
router.get('/categories', menuItemController.getPublicMenuCategories);

// 3. Get featured menu items
router.get('/featured', asyncHandler(async (req, res) => {
  const result = await menuService.getPublicMenuItems({ featured: true, limit: 12 });
  res.status(200).json(
    new ApiResponse(200, result.items, 'Featured menu items fetched successfully')
  );
}));

// 4. Get single published menu item by ID or slug
router.get('/items/:id', menuItemController.getPublicMenuItemById);
router.get('/:id', menuItemController.getPublicMenuItemById);

module.exports = router;
