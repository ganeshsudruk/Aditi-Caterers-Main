const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

// Admin Endpoints
router.get('/', serviceController.getAdminServices);
router.post('/', serviceController.createService);
router.patch('/reorder', serviceController.reorderServices);
router.get('/:id', serviceController.getServiceById);
router.put('/:id', serviceController.updateService);
router.patch('/:id', serviceController.updateService);
router.patch('/:id/status', serviceController.updateServiceStatus);

module.exports = router;
