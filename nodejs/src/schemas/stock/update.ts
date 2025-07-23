import { z } from "zod";

export const UpdateStockSchema = z.object({
  name: z.string().optional(),
  stockLocationId: z.number().optional(),
});

export type UpdateStockType = z.infer<typeof UpdateStockSchema>;
