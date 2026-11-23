const ApiError = require('../utils/ApiError');

const errorMiddleware = (err, req, res, next) => {
  let error = err;

  // Handle Mongoose / MongoDB specific errors
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || (error.name === 'ValidationError' ? 400 : 500);
    let message = error.message || 'Internal Server Error';
    let errors = [];

    // Mongoose validation error
    if (error.name === 'ValidationError') {
      message = 'Validation Error';
      errors = Object.values(error.errors || {}).map((val) => val.message);
    } else if (error.code === 11000) {
      // Duplicate key error
      const field = Object.keys(error.keyValue || {})[0] || 'field';
      message = `Duplicate value entered for ${field}`;
      error.statusCode = 409;
    } else if (error.name === 'CastError') {
      message = `Invalid resource identifier: ${error.value}`;
      error.statusCode = 400;
    }

    error = new ApiError(statusCode, message, errors, err.stack);
  }

  const response = {
    success: false,
    message: error.message,
    errors: error.errors || [],
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  };

  res.status(error.statusCode || 500).json(response);
};

module.exports = errorMiddleware;
