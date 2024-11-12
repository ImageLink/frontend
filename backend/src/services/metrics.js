const prometheus = require('prom-client');

// Create a Registry to register the metrics
const register = new prometheus.Registry();

// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: 'guest-post-marketplace'
});

// Enable the collection of default metrics
prometheus.collectDefaultMetrics({ register });

// Custom metrics
const httpRequestDurationMicroseconds = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.5, 1, 2, 5]
});

const activeUsers = new prometheus.Gauge({
  name: 'active_users_total',
  help: 'Total number of active users'
});

const totalListings = new prometheus.Gauge({
  name: 'listings_total',
  help: 'Total number of listings',
  labelNames: ['status']
});

const messagesSent = new prometheus.Counter({
  name: 'messages_sent_total',
  help: 'Total number of messages sent'
});

register.registerMetric(httpRequestDurationMicroseconds);
register.registerMetric(activeUsers);
register.registerMetric(totalListings);
register.registerMetric(messagesSent);

module.exports = {
  register,
  metrics: {
    httpRequestDurationMicroseconds,
    activeUsers,
    totalListings,
    messagesSent
  }
};