import { z } from "zod";

export const OperatorSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  username: z.string().optional(),
  email: z.string().email().or(z.literal("")).optional(),
  password: z.string().optional(),
  isActive: z.boolean().optional(), // Prisma default is true, so optional here
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  movementHistory: z.array(z.any()).optional(), // Replace z.any() with your MovementHistory schema if available
  operatorType: z.enum(["ADMIN", "REGULAR"]).optional(),
});

export type OperatorType = z.infer<typeof OperatorSchema>;
