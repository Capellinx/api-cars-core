import { Schema, model } from "mongoose";
import { z } from "zod";

export const historyLogSchema = z.object({
   message: z.string(),
   createdAt: z.date(),
})