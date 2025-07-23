import { z } from "zod";

export const ItemLocationSchema = z.object({
  id: z.number(),
  name: z.string(),

  createdAt: z.date(),
  updatedAt: z.date(),
  // Item: z.array(z.any()).optional(), // Replace z.any() with your Item schema if available
});

export type ItemLocationType = z.infer<typeof ItemLocationSchema>;
