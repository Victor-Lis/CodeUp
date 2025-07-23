import { z } from "zod";

export const UpdateOperatorSchema = z.object({
  name: z.string().optional(),
  username: z.string().optional(),
  email: z.string().email().or(z.literal("")).optional(),
  password: z.string().optional(),
  isActive: z.boolean().optional(), 
  operatorType: z.enum(["ADMIN", "REGULAR"]).optional(),
});

export type UpdateOperatorType = z.infer<typeof UpdateOperatorSchema>;
