import { z } from "zod";
import { multipartFileSchema } from "../_global/multipartFile";

export const UpdateChallengeSchema = z.object({
  file: multipartFileSchema.optional(),
});

export type UpdateChallengeType = z.infer<typeof UpdateChallengeSchema>;
