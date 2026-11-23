const mongoose = require('mongoose');

/**
 * Validate that an ID is a valid MongoDB ObjectId
 * @param {string} id
 * @returns {boolean}
 */
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

/**
 * Clean and normalize phone numbers (strips non-digits, handles +91 / 91 country codes)
 * @param {string} phone
 * @returns {string} 10-digit phone number
 */
const normalizePhone = (phone) => {
  if (!phone) return '';
  let digits = String(phone).replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    digits = digits.slice(2);
  }
  return digits;
};

/**
 * Safely round monetary amount to 2 decimal places to avoid IEEE-754 floating point issues
 * @param {number} amount
 * @returns {number}
 */
const roundAmount = (amount) => {
  const num = Number(amount) || 0;
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

/**
 * Reusable pagination and sorting query helper
 * @param {Object} queryParams req.query
 * @param {Array<string>} allowedSortFields
 * @param {string} defaultSortField
 * @returns {Object} { page, limit, skip, sort }
 */
const parsePaginationAndSort = (queryParams = {}, allowedSortFields = ['createdAt', 'updatedAt'], defaultSortField = 'createdAt') => {
  const page = Math.max(1, parseInt(queryParams.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(queryParams.limit, 10) || 10));
  const skip = (page - 1) * limit;

  const sortBy = allowedSortFields.includes(queryParams.sortBy) ? queryParams.sortBy : defaultSortField;
  const sortOrder = queryParams.sortOrder === 'asc' || queryParams.sortOrder === '1' ? 1 : -1;

  return {
    page,
    limit,
    skip,
    sort: { [sortBy]: sortOrder },
  };
};

module.exports = {
  isValidObjectId,
  normalizePhone,
  roundAmount,
  parsePaginationAndSort,
};
