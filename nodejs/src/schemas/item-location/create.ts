import { z } from "zod";

export const CreateItemLocationSchema = z.object({
  name: z.string(),
});

export type CreateItemLocationType = z.infer<typeof CreateItemLocationSchema>;
