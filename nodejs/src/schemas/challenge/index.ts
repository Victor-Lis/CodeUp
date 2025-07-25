import { z } from "zod";

export const ChallengeSchema = z.object({
  id: z.number().optional(),
  fileUrl: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type ChallengeType = z.infer<typeof ChallengeSchema>;
