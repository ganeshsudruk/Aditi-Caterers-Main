const express = require('express');
const router = express.Router();
const ApiResponse = require('../utils/ApiResponse');

router.get('/health', (req, res) => {
  const healthData = {
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  };

  res.status(200).json(new ApiResponse(200, healthData, 'API is running'));
});

module.exports = router;
