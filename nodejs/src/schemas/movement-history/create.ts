import { z } from "zod";

export const createMovementHistorySchema = z.object({
  operatorId: z.number(),
  stockId: z.number(),
  itemId: z.number(),
  movementType: z.enum(["IN", "OUT"]),
});

export type CreateMovementHistoryType = z.infer<
  typeof createMovementHistorySchema
>;
