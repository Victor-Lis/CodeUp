import { z } from "zod";
import { ItemModelSchema } from "../item-model";

export const FirebaseImageSchema = z.object({
  id: z.number().optional().nullable(),

  bucketPath: z.string().optional().nullable(),
  publicUrl: z.string().optional().nullable(),

  createdAt: z.date().optional().nullable(),

  itemModelId: z.number().optional().nullable(),
  itemModel: ItemModelSchema.optional().nullable(),
});

export type FirebaseImageType = z.infer<typeof FirebaseImageSchema>;
