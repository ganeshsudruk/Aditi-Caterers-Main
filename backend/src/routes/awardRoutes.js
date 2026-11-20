const express = require('express');
const router = express.Router();
const awardController = require('../controllers/awardController');

// Admin routes
router.get('/', awardController.getAdminAwards);
router.post('/', awardController.createAward);
router.patch('/reorder', awardController.reorderAwards);
router.get('/:id', awardController.getAwardById);
router.put('/:id', awardController.updateAward);
router.patch('/:id', awardController.updateAward);
router.patch('/:id/status', awardController.updateAwardStatus);
router.patch('/:id/order', awardController.updateAwardOrder);
router.patch('/:id/featured', awardController.updateAwardFeatured);
router.post('/:id/restore', awardController.restoreAward);
router.delete('/:id', awardController.deleteAward);

// Public routes
router.get('/public/all', awardController.getPublicAwards);
router.get('/public/featured', awardController.getPublicFeaturedAwards);
router.get('/public/categories', awardController.getPublicAwardCategories);

module.exports = router;
