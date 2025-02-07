import { z } from "zod";

export const createCarSchema = z.object({
   name: z.string(),
   brand: z.string(),
   yearFabrication: z.coerce.number(),
   price: z.coerce.number().min(0)
})

export type CreateCarDTO = z.infer<typeof createCarSchema>