const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const getCorsOptions = require('./config/cors');
const routes = require('./routes');
const notFoundMiddleware = require('./middleware/notFoundMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

// 1. Security HTTP Headers
app.use(helmet());

// 2. CORS configuration
app.use(cors(getCorsOptions()));

// 3. Request Logging in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// 4. Rate Limiting for general API endpoints
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Limit each IP to 300 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.',
  },
});
app.use('/api', limiter);

// 5. Body Parsing with size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 6. API versioned routes mount (/api/v1)
app.use('/api/v1', routes);

// Also mount /api for legacy or direct frontend backwards-compatibility
app.use('/api', routes);

// 7. Not Found Handling
app.use(notFoundMiddleware);

// 8. Centralized Error Handling
app.use(errorMiddleware);

module.exports = app;
