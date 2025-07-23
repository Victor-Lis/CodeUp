import { z } from "zod";

export const CreateStockSchema = z.object({
  name: z.string(),
  stockLocationId: z.number(),
});

export type CreateStockType = z.infer<typeof CreateStockSchema>;
