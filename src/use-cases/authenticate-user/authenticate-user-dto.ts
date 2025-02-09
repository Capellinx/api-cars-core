import { z } from "zod";

export const authenticateUserSchema = z.object({
   login: z.string(),
   password: z.string()
})

export type AuthenticateUserDTO = z.infer<typeof authenticateUserSchema>