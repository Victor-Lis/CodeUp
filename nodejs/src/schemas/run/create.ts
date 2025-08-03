import { z } from "zod";

export const CreateRunSchema = z.object({
  fileUrl: z.string(),
  challengeId: z.number(),
  userId: z.number(),
});

export type CreateRunType = z.infer<typeof CreateRunSchema>;

export const CreateRunRouteSchema = z.object({
  // file: multipartFileSchema,
  challengeId: z.string().transform((val) => parseInt(val, 10)),
});

export type CreateRunRouteType = z.infer<typeof CreateRunRouteSchema>;
