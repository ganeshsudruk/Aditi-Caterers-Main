const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');

router.get('/', packageController.getAdminPackages);
router.post('/', packageController.createPackage);
router.patch('/reorder', packageController.reorderPackages);
router.get('/:id', packageController.getPackageById);
router.put('/:id', packageController.updatePackage);
router.patch('/:id', packageController.updatePackage);
router.patch('/:id/status', packageController.updatePackageStatus);

module.exports = router;
