import { z } from "zod";

export const UpdateItemLocationSchema = z.object({
  name: z.string(),
});

export type UpdateItemLocationType = z.infer<typeof UpdateItemLocationSchema>;
