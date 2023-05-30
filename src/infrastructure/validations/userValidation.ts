import { z } from 'zod'

export const userBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  nome: z.string()
})

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})
