const express = require('express');
const router = express.Router();
const quotationController = require('../controllers/quotationController');

// Admin quotation routes
router.get('/', quotationController.getAdminQuotations);
router.post('/', quotationController.createQuotation);
router.post('/from-enquiry', quotationController.createFromEnquiry);
router.get('/:id', quotationController.getQuotationById);
router.put('/:id', quotationController.updateQuotation);
router.patch('/:id/issue', quotationController.issueQuotation);
router.post('/:id/revision', quotationController.createRevision);
router.patch('/:id/status', quotationController.updateQuotationStatus);
router.post('/:id/response', quotationController.recordCustomerResponse);
router.delete('/:id', quotationController.deleteQuotation);

module.exports = router;
