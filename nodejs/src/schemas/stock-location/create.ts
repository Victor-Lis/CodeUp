import { z } from "zod";

export const CreateStockLocationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string(),
});

export type CreateStockLocationType = z.infer<typeof CreateStockLocationSchema>;
