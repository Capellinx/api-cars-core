import { Schema, model } from "mongoose";
import { z } from "zod";

export const historyLogSchema = z.object({
   car_id: z.string(),
   created_at: z.date(),
   process_at: z.date()
})

export type HistoryDTO = z.infer<typeof historyLogSchema>