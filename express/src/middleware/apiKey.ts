import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';

export function requireApiKey(req:Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key']
    const expected = process.env.INTERNAL_API_KEY;

    if (
        typeof apiKey !== 'string' ||
        !expected || 
        apiKey.length !== expected.length ||
        !crypto.timingSafeEqual(Buffer.from(apiKey), Buffer.from(expected))
    ) {
        return res.status(401).json({ error: 'Unathorized' })
    }

    next()
} 