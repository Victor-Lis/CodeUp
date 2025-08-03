import { run } from "node:test";
import { z } from "zod";

export const UpdateRunSchema = z.object({
  fileUrl: z.string(),
  challengeId: z.number(),
  userId: z.number(),
  runId: z.number(),
});

export type UpdateRunType = z.infer<typeof UpdateRunSchema>;

export const UpdateRunRouteSchema = z.object({
  // file: multipartFileSchema,
  approved: z.boolean().optional(),
});

export type UpdateRunRouteType = z.infer<typeof UpdateRunRouteSchema>;
