import { z } from "zod";
import { CategorySchema } from "../category";
import { FirebaseImageSchema } from "../firebase-image";

export const ItemModelSchema = z.object({
  id: z.number().optional().nullable(),
  name: z.string().optional().nullable(),
  categoryId: z.number().optional().nullable(),
  description: z.string().nullable().optional().nullable(),
  observation: z.string().nullable().optional().nullable(),

  itemsCount: z.number().int().optional().nullable(),
  minQuantity: z.number().int().optional().nullable(),

  createdAt: z.date().optional().nullable(),
  updatedAt: z.date().optional().nullable(),

  datasheet: z.any().optional().nullable(), // FirebaseImageSchema.optional().nullable(),
  category: CategorySchema.optional().nullable(),
});

export type ItemModelType = z.infer<typeof ItemModelSchema>;
