const express = require('express');
const router = express.Router();
const menuCategoryController = require('../controllers/menuCategoryController');

router.get('/', menuCategoryController.getAdminCategories);
router.post('/', menuCategoryController.createCategory);
router.put('/:id', menuCategoryController.updateCategory);
router.patch('/:id', menuCategoryController.updateCategory);
router.patch('/:id/status', menuCategoryController.updateCategoryStatus);

module.exports = router;
