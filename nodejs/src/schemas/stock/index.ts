import { z } from "zod";
import { StockLocationSchema } from "../stock-location";

export const StockSchema = z.object({
  id: z.number(),
  name: z.string(),
  stockLocationId: z.number().nullable().optional(),
  // location is an object or null/undefined, so we can use StockLocationSchema.optional().nullable()
  stockLocation: StockLocationSchema.optional().nullable(),
  // Category, MovementHistory, Item are arrays, you can define their schemas if needed
  // For now, we use z.array(z.any()) as placeholders
  category: z.array(z.any()).optional(),
  movementHistory: z.array(z.any()).optional(),
  item: z.array(z.any()).optional(),
});

export type StockType = z.infer<typeof StockSchema>;
