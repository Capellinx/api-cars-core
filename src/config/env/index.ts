import { z } from "zod";
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
   DATABASE_URL: z.string().describe("Database URL"),
   PORT: z.coerce.number().default(3000).describe("Server port"),
   USERNAME: z.string().describe("Service username"),
   PASSWORD: z.string().describe("Service password"),
   BASE_URL: z.string().describe("Base URL service to consume"),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
   console.error("❌ Invalid environment variables", _env.error.format());
   throw new Error("Invalid environment variables");
}

export const env = _env.data