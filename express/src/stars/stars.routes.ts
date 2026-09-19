import { Router } from 'express'
import { buyStars } from '@/stars/stars.controllers'
import { buyStarsLimiter } from '@/middleware/rateLimiter'

const router = Router()
router.post('/buy', buyStarsLimiter, buyStars)

export default router