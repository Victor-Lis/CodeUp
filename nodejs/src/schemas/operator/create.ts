import { z } from "zod";

export const CreateOperatorSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  isActive: z.boolean().optional().default(true),
  operatorType: z.enum(["ADMIN", "REGULAR"]).default("REGULAR"),
});

export type CreateOperatorType = z.infer<typeof CreateOperatorSchema>;
