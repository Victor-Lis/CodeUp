import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  isActive: z.boolean().optional().default(true),
  userType: z.enum(["ADMIN", "REGULAR"]).default("REGULAR"),
});

export type CreateUserType = z.infer<typeof CreateUserSchema>;
