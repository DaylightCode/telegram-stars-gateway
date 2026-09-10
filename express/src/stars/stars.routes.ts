import { Router } from 'express'
import { buyStars } from './stars.controllers'

const router = Router()
router.post('/buy', buyStars)

export default router