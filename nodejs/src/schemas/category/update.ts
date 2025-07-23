import { z } from "zod";

export const UpdateCategorySchema = z.object({
  name: z.string().optional(),
  prefix: z.string().optional(),
  // row: z.string().nullable().optional(),
  color: z.string().nullable().optional(),
  column: z.string().nullable().optional(),
});

export type UpdateCategoryType = z.infer<typeof UpdateCategorySchema>;
