import { z } from "zod";

export const listCarsSchema = z.object({
   page: z.coerce.number().min(1).default(1),
   pageSize: z.coerce.number().min(1).max(100).default(10),
   active: z.coerce.boolean().default(true)
})

export type ListCarsDTO = z.infer<typeof listCarsSchema>