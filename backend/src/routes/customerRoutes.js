const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
// const { authenticateAdmin } = require('../middleware/authMiddleware');

// If auth middleware is active in backend, route would be: router.use(authenticateAdmin);

router.get('/', customerController.getCustomers);
router.post('/', customerController.createCustomer);
router.get('/:id', customerController.getCustomerById);
router.put('/:id', customerController.updateCustomer);
router.patch('/:id', customerController.updateCustomer);
router.patch('/:id/archive', customerController.archiveCustomer);
router.patch('/:id/restore', customerController.restoreCustomer);
router.post('/:id/notes', customerController.addCustomerNote);

module.exports = router;
