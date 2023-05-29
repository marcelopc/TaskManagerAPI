import { type z } from 'zod'

export const validator = (schema: z.Schema, element: any): any => {
  schema.parse(element)
}
