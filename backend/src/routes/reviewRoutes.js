const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Admin endpoints
router.get('/', reviewController.getAdminReviews);
router.post('/', reviewController.createReview);
router.get('/:id', reviewController.getReviewById);
router.put('/:id', reviewController.updateReview);
router.patch('/:id', reviewController.updateReview);
router.patch('/:id/approve', reviewController.approveReview);
router.patch('/:id/reject', reviewController.rejectReview);
router.patch('/:id/status', reviewController.updateReviewStatus);
router.patch('/:id/featured', reviewController.updateReviewFeatured);
router.patch('/:id/order', reviewController.updateReviewOrder);
router.post('/:id/restore', reviewController.restoreReview);
router.delete('/:id', reviewController.deleteReview);

// Public endpoints
router.get('/public/all', reviewController.getPublicReviews);
router.get('/public/featured', reviewController.getPublicFeaturedReviews);

module.exports = router;
