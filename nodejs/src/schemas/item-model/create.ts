import { z } from "zod";

export const CreateItemModelSchema = z.object({
  name: z.string(),
  categoryId: z.number().int().positive(),
  minQuantity: z.number().int().positive(),
  description: z.string().nullable().optional(),
  observation: z.string().nullable().optional(),
  datasheet: z.object({
    originalname: z.string(),
    mimetype: z.string(),
    buffer: z.string().optional().nullable(),
    size: z.number().int().positive(),
    fileType: z.string().optional(),
  }),
});

export type CreateItemModelType = z.infer<typeof CreateItemModelSchema>;
