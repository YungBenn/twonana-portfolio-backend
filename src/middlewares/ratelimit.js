import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 100, // 100 request
  standardHeaders: true,
  legacyHeaders: false,
});
