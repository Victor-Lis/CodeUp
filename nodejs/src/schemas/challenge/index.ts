import { z } from "zod";

export const ChallengeSchema = z.object({
  id: z.number().optional(),
  fileUrl: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  testCases: z.array(z.any()).optional(), // Assuming testCases is an array of any type, adjust as necessary/
  runs: z.array(z.any()).optional(), // Assuming runs is an array of any type, adjust as necessary
  run: z.any().optional(), // Assuming run is an object, adjust as necessary
});

export type ChallengeType = z.infer<typeof ChallengeSchema>;
