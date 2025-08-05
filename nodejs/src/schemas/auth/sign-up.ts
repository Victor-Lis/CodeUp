import { z } from "zod";

export const SignUpSchema = z.object({
  name: z.string(),
  credential: z.string(),
  password: z.string(),
});

export type SignUpType = z.infer<typeof SignUpSchema>;
