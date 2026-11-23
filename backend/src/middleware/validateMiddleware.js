const { validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');

const validateMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorDetails = errors.array().map((err) => ({
      field: err.path || err.param,
      message: err.msg,
      value: err.value,
    }));
    return next(new ApiError(400, 'Validation failed for request data', errorDetails));
  }
  next();
};

module.exports = validateMiddleware;
