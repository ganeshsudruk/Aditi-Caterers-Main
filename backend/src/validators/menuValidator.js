const { body, query } = require('express-validator');

const createMenuItemValidator = [
  body('name.en')
    .notEmpty()
    .withMessage('English menu item name is required')
    .trim()
    .isLength({ max: 120 }),
  body('name.mr')
    .optional()
    .trim()
    .isLength({ max: 120 }),
  body('category')
    .optional(),
  body('categoryId')
    .optional(),
  body('price.amount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price amount must be a non-negative number'),
  body('displayOrder')
    .optional()
    .isInt({ min: 0 }),
];

const updateMenuItemValidator = [
  body('name.en')
    .optional()
    .trim()
    .isLength({ min: 1, max: 120 }),
  body('price.amount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price amount must be a non-negative number'),
  body('status')
    .optional()
    .isIn(['draft', 'published', 'unpublished', 'archived'])
    .withMessage('Invalid status'),
];

const createCategoryValidator = [
  body('name.en')
    .notEmpty()
    .withMessage('English category name is required')
    .trim()
    .isLength({ max: 100 }),
  body('name.mr')
    .optional()
    .trim()
    .isLength({ max: 100 }),
  body('displayOrder')
    .optional()
    .isInt({ min: 0 }),
];

module.exports = {
  createMenuItemValidator,
  updateMenuItemValidator,
  createCategoryValidator,
};
