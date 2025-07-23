import { z } from "zod";
import { FirebaseImageSchema } from "../firebase-image";

export const UpdateItemModelSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  observation: z.string().optional(),
  datasheet: z.object({
    originalname: z.string(),
    mimetype: z.string(),
    buffer: z.string().optional().nullable(),
    size: z.number().int().positive(),
    fileType: z.string().optional(),
  }).optional(),
  minQuantity: z.number().int().optional(),
});

export type UpdateItemModelType = z.infer<typeof UpdateItemModelSchema>;
