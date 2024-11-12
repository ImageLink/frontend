const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { authLimiter, apiLimiter } = require('./middleware/rateLimiter');
const metricsMiddleware = require('./middleware/metrics');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./services/logger');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Metrics middleware
app.use(metricsMiddleware);

// Rate limiting
app.use('/api/auth', authLimiter);
app.use('/api', apiLimiter);

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/listings', require('./routes/listing.routes'));
app.use('/api/messages', require('./routes/message.routes'));
app.use('/api/requirements', require('./routes/requirement.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api', require('./routes/metrics.routes'));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received. Closing server...');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});