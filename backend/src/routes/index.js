const express = require('express');
const router = express.Router();

// Health check route
const healthRoutes = require('./healthRoutes');
router.use('/', healthRoutes);

// Authentication routes
const authRoutes = require('./authRoutes');
router.use('/auth', authRoutes);
router.use('/admin/auth', authRoutes); // Backwards-compatible mount for frontend

// Booking routes
const bookingRoutes = require('./bookingRoutes');
const adminBookingRoutes = require('./adminBookingRoutes');
router.use('/bookings', bookingRoutes);
router.use('/enquiries', bookingRoutes); // Public enquiry alias for frontend compatibility
router.use('/admin/bookings', adminBookingRoutes);

// Menu routes (Public & Admin)
const publicMenuRoutes = require('./publicMenuRoutes');
const menuItemRoutes = require('./menuItemRoutes');
const menuCategoryRoutes = require('./menuCategoryRoutes');
router.use('/public/menu', publicMenuRoutes);
router.use('/public/menu-categories', (req, res, next) => {
  req.url = '/categories';
  publicMenuRoutes(req, res, next);
});
router.use('/menu', publicMenuRoutes); // Direct public menu mount
router.use('/admin/menu/categories', menuCategoryRoutes);
router.use('/admin/menu/items', menuItemRoutes);
router.use('/admin/menu-categories', menuCategoryRoutes);
router.use('/admin/menu', menuItemRoutes);

// Other feature routes
const awardRoutes = require('./awardRoutes');
const customerRoutes = require('./customerRoutes');
const galleryRoutes = require('./galleryRoutes');
const packageRoutes = require('./packageRoutes');
const quotationRoutes = require('./quotationRoutes');
const reportRoutes = require('./reportRoutes');
const reviewRoutes = require('./reviewRoutes');
const serviceRoutes = require('./serviceRoutes');
const settingRoutes = require('./settingRoutes');

// Feature prefixes
router.use('/admin/awards', awardRoutes);
router.use('/admin/customers', customerRoutes);
router.use('/admin/gallery', galleryRoutes);
router.use('/admin/packages', packageRoutes);
router.use('/admin/quotations', quotationRoutes);
router.use('/admin/reports', reportRoutes);
router.use('/admin/reviews', reviewRoutes);
router.use('/admin/services', serviceRoutes);
router.use('/admin/website-settings', settingRoutes);
router.use('/website-settings', settingRoutes);

module.exports = router;
