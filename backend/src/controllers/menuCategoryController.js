const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const menuCategoryService = require('../services/menuCategoryService');

/**
 * Admin: Get all categories
 * GET /api/v1/admin/menu/categories or /api/v1/admin/menu-categories
 */
const getAdminCategories = asyncHandler(async (req, res) => {
  const result = await menuCategoryService.getAdminCategories();
  res.status(200).json(
    new ApiResponse(200, result, 'Categories retrieved successfully')
  );
});

/**
 * Admin: Create category
 * POST /api/v1/admin/menu/categories
 */
const createCategory = asyncHandler(async (req, res) => {
  const result = await menuCategoryService.createCategory(req.body, req.user);
  res.status(201).json(
    new ApiResponse(201, result, 'Category created successfully')
  );
});

/**
 * Admin: Update category
 * PUT / PATCH /api/v1/admin/menu/categories/:id
 */
const updateCategory = asyncHandler(async (req, res) => {
  const result = await menuCategoryService.updateCategory(req.params.id, req.body, req.user);
  res.status(200).json(
    new ApiResponse(200, result, 'Category updated successfully')
  );
});

/**
 * Admin: Update category status
 * PATCH /api/v1/admin/menu/categories/:id/status
 */
const updateCategoryStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const result = await menuCategoryService.updateCategoryStatus(req.params.id, status, req.user);
  res.status(200).json(
    new ApiResponse(200, result, `Category status updated to ${status}`)
  );
});

/**
 * Admin: Delete category
 * DELETE /api/v1/admin/menu/categories/:id
 */
const deleteCategory = asyncHandler(async (req, res) => {
  const result = await menuCategoryService.deleteCategory(req.params.id, req.user);
  res.status(200).json(
    new ApiResponse(200, null, result.message)
  );
});

/**
 * Admin: Reorder categories
 * PATCH /api/v1/admin/menu/categories/reorder
 */
const reorderCategories = asyncHandler(async (req, res) => {
  const items = req.body.items || req.body.orders || [];
  const result = await menuCategoryService.reorderCategories(items);
  res.status(200).json(
    new ApiResponse(200, null, result.message)
  );
});

module.exports = {
  getAdminCategories,
  createCategory,
  updateCategory,
  updateCategoryStatus,
  deleteCategory,
  reorderCategories,
};
