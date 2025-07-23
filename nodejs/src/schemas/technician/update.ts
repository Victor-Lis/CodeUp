import { z } from "zod";

export const UpdateTechnicianSchema = z.object({
  name: z.string(),
  status: z.boolean(),
});

export type UpdateTechnicianType = z.infer<typeof UpdateTechnicianSchema>;
