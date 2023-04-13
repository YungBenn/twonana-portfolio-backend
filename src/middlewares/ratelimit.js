import rateLimit from 'express-rate-limit';

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 100, // 100 request
  standardHeaders: true,
  legacyHeaders: false,
});

export default apiLimiter;
