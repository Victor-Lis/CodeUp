import { z } from "zod";

export const CreateCategorySchema = z.object({
  name: z.string(),
  prefix: z.string(),
  // row: z.string().nullable().optional(),
  color: z.string().nullable().optional(),
  column: z.string().nullable().optional(),
});

export type CreateCategoryType = z.infer<typeof CreateCategorySchema>;
