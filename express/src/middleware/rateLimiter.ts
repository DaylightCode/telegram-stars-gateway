import rateLimit from 'express-rate-limit'

export const buyStarsLimiter = rateLimit({
  windowMs: 60_000,
  max: 5,
  message: { error: 'Too many requests, please try again later.' },
})
