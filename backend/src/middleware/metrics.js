const { metrics } = require('../services/metrics');

const metricsMiddleware = (req, res, next) => {
  const start = Date.now();

  // Record the end time and duration on response finish
  res.on('finish', () => {
    const duration = Date.now() - start;
    metrics.httpRequestDurationMicroseconds
      .labels(req.method, req.route?.path || req.path, res.statusCode.toString())
      .observe(duration / 1000); // Convert to seconds
  });

  next();
};

module.exports = metricsMiddleware;