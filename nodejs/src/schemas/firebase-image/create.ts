import { z } from "zod";

export const CreateFirebaseImageSchema = z.object({
  originalname: z.string(),
  mimetype: z.string(),
  buffer: z
    .union([z.instanceof(Buffer), z.string()]),
  size: z.number().int().positive(),
});

export type CreateFirebaseImageType = z.infer<typeof CreateFirebaseImageSchema>;
