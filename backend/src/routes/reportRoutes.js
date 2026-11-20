const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Admin report endpoints
router.get('/overview', reportController.getOverviewReport);
router.get('/quotations', reportController.getQuotationReport);
router.get('/bookings', reportController.getBookingReport);
router.get('/enquiries', reportController.getEnquiryReport);
router.get('/customers', reportController.getCustomerReport);
router.get('/services', reportController.getServicesReport);
router.get('/content', reportController.getContentReport);

module.exports = router;
