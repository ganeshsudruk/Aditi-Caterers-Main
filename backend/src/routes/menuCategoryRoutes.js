const express = require('express');
const router = express.Router();
const menuCategoryController = require('../controllers/menuCategoryController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const validateMiddleware = require('../middleware/validateMiddleware');
const { createCategoryValidator } = require('../validators/menuValidator');

// Protect all admin menu category routes
router.use(authMiddleware);

// 1. List all categories
router.get(
  '/',
  roleMiddleware('superadmin', 'owner', 'admin', 'manager', 'editor', 'staff'),
  menuCategoryController.getAdminCategories
);

// 2. Create category
router.post(
  '/',
  roleMiddleware('superadmin', 'owner', 'admin', 'editor'),
  createCategoryValidator,
  validateMiddleware,
  menuCategoryController.createCategory
);

// 3. Reorder categories
router.patch(
  '/reorder',
  roleMiddleware('superadmin', 'owner', 'admin', 'editor'),
  menuCategoryController.reorderCategories
);

// 4. Update category (PUT and PATCH)
router.put(
  '/:id',
  roleMiddleware('superadmin', 'owner', 'admin', 'editor'),
  menuCategoryController.updateCategory
);
router.patch(
  '/:id',
  roleMiddleware('superadmin', 'owner', 'admin', 'editor'),
  menuCategoryController.updateCategory
);

// 5. Update category status
router.patch(
  '/:id/status',
  roleMiddleware('superadmin', 'owner', 'admin', 'editor'),
  menuCategoryController.updateCategoryStatus
);

// 6. Delete / Archive category
router.delete(
  '/:id',
  roleMiddleware('superadmin', 'owner', 'admin'),
  menuCategoryController.deleteCategory
);

module.exports = router;
