import { z } from "zod";

export const AuthSchema = z.object({
  credential: z.string(),
  password: z.string(),
});

export type AuthType = z.infer<typeof AuthSchema>;
