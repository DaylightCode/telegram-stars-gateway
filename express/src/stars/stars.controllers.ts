import { Request, Response, NextFunction } from 'express'
import { buyStarsService } from './stars.services.js'

export async function buyStars(req: Request, res: Response, next: NextFunction) {
    try {
        const { recipient, qty } = req.body 
        const result = await buyStarsService(recipient, qty)
        res.json({ result })
    } catch (err) {
        next(err)
    }
} 

 