const express = require('express');
const router = express.Router();
const settingController = require('../controllers/settingController');

// Admin endpoints
router.get('/', settingController.getAdminSettings);
router.put('/', settingController.updateAdminSettings);
router.post('/publish', settingController.publishSettings);

// Public settings endpoint
router.get('/public', settingController.getPublicSettings);

module.exports = router;
