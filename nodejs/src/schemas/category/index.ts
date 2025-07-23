import { z } from "zod";

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  prefix: z.string(),
  // row: z.string().nullable().optional(),
  color: z.string().nullable().optional(),
  column: z.string().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  itemModel: z.array(z.any()).optional().nullable(),
});

export type CategoryType = z.infer<typeof CategorySchema>;
