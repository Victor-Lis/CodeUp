import { z } from "zod";

export const CreateTechnicianSchema = z.object({
  name: z.string(),
});

export type CreateTechnicianType = z.infer<typeof CreateTechnicianSchema>;
