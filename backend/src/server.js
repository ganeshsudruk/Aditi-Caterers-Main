const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const http = require('http');
const mongoose = require('mongoose');

const app = require('./app');
const connectDatabase = require('./config/database');

// 1. Validate required environment variables
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];
const missingVars = requiredEnvVars.filter((v) => !process.env[v]);

if (missingVars.length > 0) {
  console.error(`[Server] FATAL: Missing required environment variables: ${missingVars.join(', ')}`);
  process.exit(1);
}

const PORT = process.env.PORT || 5000;
let server;

// 2. Initialize database connection and start HTTP server
const startServer = async () => {
  try {
    await connectDatabase();

    server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`[Server] Aditi Caterers Backend running in [${process.env.NODE_ENV || 'development'}] mode on port ${PORT}`);
      console.log(`[Server] Health endpoint: http://localhost:${PORT}/api/v1/health`);
    });
  } catch (error) {
    console.error(`[Server] Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

// 3. Graceful shutdown handler
const gracefulShutdown = (signal) => {
  console.log(`\n[Server] ${signal} signal received: closing HTTP server and database connections...`);

  if (server) {
    server.close(async () => {
      console.log('[Server] HTTP server closed.');
      try {
        await mongoose.connection.close(false);
        console.log('[MongoDB] Database connection closed.');
        process.exit(0);
      } catch (err) {
        console.error(`[MongoDB] Error during connection close: ${err.message}`);
        process.exit(1);
      }
    });

    // Force close if graceful termination hangs
    setTimeout(() => {
      console.error('[Server] Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 10000);
  } else {
    process.exit(0);
  }
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('unhandledRejection', (reason, promise) => {
  console.error('[Server] Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('[Server] Uncaught Exception:', error);
  process.exit(1);
});

startServer();
