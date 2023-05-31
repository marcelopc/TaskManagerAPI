import { z } from 'zod'

export const userTaskCreateSchema = z.object({
  title: z.string(),
  description: z.string()
})
