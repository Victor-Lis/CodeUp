import { error } from "console";
import { z } from "zod";

export const ValidationSchema = z.object({
  approved: z.boolean().optional(),
  error: z.string().optional(),
});

export type ValidationType = z.infer<typeof ValidationSchema>;
