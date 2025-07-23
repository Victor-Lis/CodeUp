import { z } from "zod";

export const StockLocationSchema = z.object({
  id: z.number(),
  name: z.string(),
  address: z.string(),
});

export type StockLocation = z.infer<typeof StockLocationSchema>;
