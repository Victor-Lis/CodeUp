import { z } from "zod";

export const RunSchema = z.object({
  id: z.number().optional(),
  approved: z.boolean().optional(),
  fileUrl: z.string().optional(),
  challengeId: z.number().optional(),
  challenge: z.any().optional(), // Adjust this based on your actual challenge schema
  userId: z.number().optional(),
  updatedAt: z.date().optional(),
  createdAt: z.date().optional(),
});

export type RunType = z.infer<typeof RunSchema>;
