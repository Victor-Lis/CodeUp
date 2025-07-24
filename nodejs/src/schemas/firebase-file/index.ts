import z from "zod";

export const FirebaseFileSchema = z.object({
  originalname: z.string(),
  mimetype: z.string(),
  buffer: z.string().optional().nullable(),
  size: z.number().int().positive(),
  fileType: z.string().optional(),
});

export type FirebaseFileType = z.infer<typeof FirebaseFileSchema>;