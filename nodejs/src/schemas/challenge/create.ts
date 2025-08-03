import { z } from "zod";
import { multipartFileSchema } from "../_global/multipartFile";

export const CreateChallengeRouteSchema = z.object({
  file: multipartFileSchema,
});

export type CreateChallengeRouteType = z.infer<typeof CreateChallengeRouteSchema>;

export const CreateChallengeSchema = z.object({
  fileUrl: z.string(),
});

export type CreateChallengeType = z.infer<typeof CreateChallengeSchema>;

