import { create } from "domain";
import { z } from "zod";

export const TechnicianSchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  status: z.boolean(),
});

export type TechnicianType = z.infer<typeof TechnicianSchema>;
