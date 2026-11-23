const defaultAllowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
];

const getCorsOptions = () => {
  const clientOriginEnv = process.env.CLIENT_ORIGIN;
  const allowedOrigins = clientOriginEnv
    ? clientOriginEnv.split(',').map((o) => o.trim())
    : defaultAllowedOrigins;

  return {
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman) in development
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS error: Origin '${origin}' is not authorized.`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    optionsSuccessStatus: 200,
  };
};

module.exports = getCorsOptions;
