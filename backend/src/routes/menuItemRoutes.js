const express = require('express');
const router = express.Router();
const menuItemController = require('../controllers/menuItemController');

router.get('/', menuItemController.getAdminMenuItems);
router.post('/', menuItemController.createMenuItem);
router.patch('/reorder', menuItemController.reorderMenuItems);
router.put('/:id', menuItemController.updateMenuItem);
router.patch('/:id', menuItemController.updateMenuItem);
router.patch('/:id/status', menuItemController.updateMenuItemStatus);

module.exports = router;
