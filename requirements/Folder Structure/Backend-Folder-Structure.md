# Aditi Caterers – Backend Folder Structure

```text
backend/
│
├── src/
│   │
│   ├── config/
│   │   ├── database.js
│   │   ├── cloudinary.js
│   │   └── cors.js
│   │
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Customer.js
│   │   ├── Booking.js
│   │   ├── Service.js
│   │   ├── Package.js
│   │   ├── MenuCategory.js
│   │   ├── MenuItem.js
│   │   ├── Gallery.js
│   │   ├── Award.js
│   │   ├── Review.js
│   │   ├── Quotation.js
│   │   ├── FAQ.js
│   │   └── WebsiteSetting.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── customerController.js
│   │   ├── bookingController.js
│   │   ├── serviceController.js
│   │   ├── packageController.js
│   │   ├── menuCategoryController.js
│   │   ├── menuItemController.js
│   │   ├── galleryController.js
│   │   ├── awardController.js
│   │   ├── reviewController.js
│   │   ├── quotationController.js
│   │   ├── faqController.js
│   │   ├── reportController.js
│   │   └── settingController.js
│   │
│   ├── routes/
│   │   ├── index.js
│   │   ├── authRoutes.js
│   │   ├── customerRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── serviceRoutes.js
│   │   ├── packageRoutes.js
│   │   ├── menuCategoryRoutes.js
│   │   ├── menuItemRoutes.js
│   │   ├── galleryRoutes.js
│   │   ├── awardRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── quotationRoutes.js
│   │   ├── faqRoutes.js
│   │   ├── reportRoutes.js
│   │   └── settingRoutes.js
│   │
│   ├── services/
│   │   ├── authService.js
│   │   ├── bookingService.js
│   │   ├── packageService.js
│   │   ├── menuService.js
│   │   ├── cloudinaryService.js
│   │   ├── whatsappService.js
│   │   ├── quotationService.js
│   │   └── emailService.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   ├── errorMiddleware.js
│   │   ├── notFoundMiddleware.js
│   │   ├── uploadMiddleware.js
│   │   └── validateMiddleware.js
│   │
│   ├── validators/
│   │   ├── authValidator.js
│   │   ├── bookingValidator.js
│   │   ├── packageValidator.js
│   │   ├── menuValidator.js
│   │   └── customerValidator.js
│   │
│   ├── utils/
│   │   ├── ApiError.js
│   │   ├── ApiResponse.js
│   │   ├── asyncHandler.js
│   │   ├── generateToken.js
│   │   ├── generateSlug.js
│   │   └── pagination.js
│   │
│   ├── templates/
│   │   ├── quotationTemplate.html
│   │   └── emailTemplate.html
│   │
│   ├── constants/
│   │   ├── bookingStatus.js
│   │   ├── roles.js
│   │   └── messages.js
│   │
│   ├── app.js
│   └── server.js
│
├── uploads/
│   └── .gitkeep
│
├── tests/
│   ├── auth.test.js
│   ├── booking.test.js
│   ├── package.test.js
│   └── menu.test.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Backend Architecture Rules

### 1. config/
Database, Cloudinary आणि application configuration.

### 2. models/
MongoDB collections साठी Mongoose schemas.

### 3. controllers/
HTTP requests receive करून response पाठवण्याची जबाबदारी.

### 4. routes/
API endpoints define करणे.

### 5. services/
Actual business logic. उदाहरणार्थ booking create करणे, quotation तयार करणे, WhatsApp integration.

### 6. middleware/
JWT authentication, authorization, uploads आणि error handling.

### 7. validators/
Frontend वरून आलेल्या request data ची backend validation.

### 8. utils/
Reusable helper functions.

### 9. templates/
Quotation PDF आणि email templates.

### 10. tests/
API आणि backend functionality testing.