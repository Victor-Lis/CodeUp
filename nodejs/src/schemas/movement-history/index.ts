import { z } from "zod";
import { OperatorSchema } from "../operator";
import { StockSchema } from "../stock";
import { ItemSchema } from "../item";

export const MovementHistorySchema = z.object({
  id: z.number(),
  operator: OperatorSchema.optional(),
  stock: StockSchema.optional(),
  item: ItemSchema.optional(),

  createdAt: z.date(),
  movementType: z.enum(["IN", "OUT"]),
});

export type MovementHistoryType = z.infer<typeof MovementHistorySchema>;
