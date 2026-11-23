const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const menuService = require('../services/menuService');

/**
 * Public: Get published menu items
 * GET /api/v1/public/menu or /api/v1/menu
 */
const getPublicMenuItems = asyncHandler(async (req, res) => {
  const result = await menuService.getPublicMenuItems(req.query);
  res.status(200).json(
    new ApiResponse(200, result, 'Menu items fetched successfully')
  );
});

/**
 * Public: Get single published menu item
 * GET /api/v1/public/menu/:id
 */
const getPublicMenuItemById = asyncHandler(async (req, res) => {
  const result = await menuService.getPublicMenuItemById(req.params.id);
  res.status(200).json(
    new ApiResponse(200, result, 'Menu item details retrieved successfully')
  );
});

/**
 * Public: Get active menu categories
 * GET /api/v1/public/menu-categories or /api/v1/menu-categories
 */
const getPublicMenuCategories = asyncHandler(async (req, res) => {
  const result = await menuService.getPublicMenuCategories();
  res.status(200).json(
    new ApiResponse(200, result, 'Menu categories retrieved successfully')
  );
});

/**
 * Admin: Get filtered menu items
 * GET /api/v1/admin/menu/items or /api/v1/admin/menu
 */
const getAdminMenuItems = asyncHandler(async (req, res) => {
  const result = await menuService.getAdminMenuItems(req.query);
  res.status(200).json(
    new ApiResponse(200, result, 'Admin menu items retrieved successfully')
  );
});

/**
 * Admin: Get single menu item by ID
 * GET /api/v1/admin/menu/items/:id or /api/v1/admin/menu/:id
 */
const getAdminMenuItemById = asyncHandler(async (req, res) => {
  const result = await menuService.getAdminMenuItemById(req.params.id);
  res.status(200).json(
    new ApiResponse(200, result, 'Menu item retrieved successfully')
  );
});

/**
 * Admin: Create menu item
 * POST /api/v1/admin/menu/items or /api/v1/admin/menu
 */
const createMenuItem = asyncHandler(async (req, res) => {
  const result = await menuService.createMenuItem(req.body, req.user);
  res.status(201).json(
    new ApiResponse(201, result, 'Menu item created successfully')
  );
});

/**
 * Admin: Update menu item
 * PUT / PATCH /api/v1/admin/menu/items/:id
 */
const updateMenuItem = asyncHandler(async (req, res) => {
  const result = await menuService.updateMenuItem(req.params.id, req.body, req.user);
  res.status(200).json(
    new ApiResponse(200, result, 'Menu item updated successfully')
  );
});

/**
 * Admin: Update status
 * PATCH /api/v1/admin/menu/items/:id/status
 */
const updateMenuItemStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const result = await menuService.updateMenuItemStatus(req.params.id, status, req.user);
  res.status(200).json(
    new ApiResponse(200, result, `Menu item status updated to ${status}`)
  );
});

/**
 * Admin: Publish menu item
 * PATCH /api/v1/admin/menu/items/:id/publish
 */
const publishMenuItem = asyncHandler(async (req, res) => {
  const result = await menuService.updateMenuItemStatus(req.params.id, 'published', req.user);
  res.status(200).json(
    new ApiResponse(200, result, 'Menu item published successfully')
  );
});

/**
 * Admin: Unpublish menu item
 * PATCH /api/v1/admin/menu/items/:id/unpublish
 */
const unpublishMenuItem = asyncHandler(async (req, res) => {
  const result = await menuService.updateMenuItemStatus(req.params.id, 'draft', req.user);
  res.status(200).json(
    new ApiResponse(200, result, 'Menu item set to draft / unpublished')
  );
});

/**
 * Admin: Archive / Delete menu item
 * DELETE /api/v1/admin/menu/items/:id
 */
const archiveMenuItem = asyncHandler(async (req, res) => {
  const result = await menuService.archiveMenuItem(req.params.id, req.user);
  res.status(200).json(
    new ApiResponse(200, null, result.message)
  );
});

/**
 * Admin: Reorder menu items
 * PATCH /api/v1/admin/menu/items/reorder
 */
const reorderMenuItems = asyncHandler(async (req, res) => {
  const orders = req.body.orders || req.body.items || [];
  const result = await menuService.reorderMenuItems(orders);
  res.status(200).json(
    new ApiResponse(200, null, result.message)
  );
});

module.exports = {
  getPublicMenuItems,
  getPublicMenuItemById,
  getPublicMenuCategories,
  getAdminMenuItems,
  getAdminMenuItemById,
  createMenuItem,
  updateMenuItem,
  updateMenuItemStatus,
  publishMenuItem,
  unpublishMenuItem,
  archiveMenuItem,
  reorderMenuItems,
};
