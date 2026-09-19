import { Request, Response, NextFunction } from 'express'
import { buyStarsService } from '@/stars/stars.services'
import { buySchema } from '@/stars/stars.schemas'

export async function buyStars(req: Request, res: Response, next: NextFunction) {
    try {
        const { recipient, qty } = buySchema.parse(req.body)
        const result = await buyStarsService(recipient, qty)
        res.json({ result })
    } catch (err) {
        next(err)
    }
} 

 