import { z } from "zod";

export const UpdateStockLocationSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
});

export type UpdateStockLocationType = z.infer<typeof UpdateStockLocationSchema>;
