import { z } from "zod";

export const UpdateUserSchema = z.object({
  name: z.string().optional(),
  username: z.string().optional(),
  email: z.string().email().or(z.literal("")).optional(),
  password: z.string().optional(),
  isActive: z.boolean().optional(),
  userType: z.enum(["ADMIN", "REGULAR"]).optional(),
});

export type UpdateUserType = z.infer<typeof UpdateUserSchema>;
