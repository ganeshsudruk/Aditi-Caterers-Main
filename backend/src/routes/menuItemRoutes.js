const express = require('express');
const router = express.Router();
const menuItemController = require('../controllers/menuItemController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const validateMiddleware = require('../middleware/validateMiddleware');
const {
  createMenuItemValidator,
  updateMenuItemValidator,
} = require('../validators/menuValidator');

// Protect all admin menu routes
router.use(authMiddleware);

// 1. List admin menu items
router.get(
  '/',
  roleMiddleware('superadmin', 'owner', 'admin', 'manager', 'editor', 'staff'),
  menuItemController.getAdminMenuItems
);

// 2. Create menu item
router.post(
  '/',
  roleMiddleware('superadmin', 'owner', 'admin', 'editor'),
  createMenuItemValidator,
  validateMiddleware,
  menuItemController.createMenuItem
);

// 3. Reorder menu items
router.patch(
  '/reorder',
  roleMiddleware('superadmin', 'owner', 'admin', 'editor'),
  menuItemController.reorderMenuItems
);

// 4. Get single menu item by ID
router.get(
  '/:id',
  roleMiddleware('superadmin', 'owner', 'admin', 'manager', 'editor', 'staff'),
  menuItemController.getAdminMenuItemById
);

// 5. Update menu item (PUT and PATCH)
router.put(
  '/:id',
  roleMiddleware('superadmin', 'owner', 'admin', 'editor'),
  updateMenuItemValidator,
  validateMiddleware,
  menuItemController.updateMenuItem
);
router.patch(
  '/:id',
  roleMiddleware('superadmin', 'owner', 'admin', 'editor'),
  updateMenuItemValidator,
  validateMiddleware,
  menuItemController.updateMenuItem
);

// 6. Update menu item status
router.patch(
  '/:id/status',
  roleMiddleware('superadmin', 'owner', 'admin', 'editor'),
  menuItemController.updateMenuItemStatus
);

// 7. Publish / Unpublish actions
router.patch(
  '/:id/publish',
  roleMiddleware('superadmin', 'owner', 'admin', 'editor'),
  menuItemController.publishMenuItem
);
router.patch(
  '/:id/unpublish',
  roleMiddleware('superadmin', 'owner', 'admin', 'editor'),
  menuItemController.unpublishMenuItem
);

// 8. Archive / Delete menu item
router.delete(
  '/:id',
  roleMiddleware('superadmin', 'owner', 'admin'),
  menuItemController.archiveMenuItem
);

module.exports = router;
