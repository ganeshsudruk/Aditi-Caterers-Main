const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');

// Admin routes
router.get('/', galleryController.getAdminGallery);
router.post('/', galleryController.createGalleryPhoto);
router.patch('/reorder', galleryController.reorderGallery);
router.get('/:id', galleryController.getGalleryById);
router.put('/:id', galleryController.updateGalleryPhoto);
router.patch('/:id', galleryController.updateGalleryPhoto);
router.patch('/:id/status', galleryController.updateGalleryStatus);
router.delete('/:id', galleryController.deleteGalleryPhoto);

module.exports = router;
