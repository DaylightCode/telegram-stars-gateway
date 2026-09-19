import { z } from 'zod'

export const buySchema = z.object({
  recipient: z.string().min(1).max(64),
  qty: z.number().int().positive().min(50).max(1_000_000),
});
