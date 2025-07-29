import { z } from "zod";
import { multipartFileSchema } from "../_global/multipartFile";

export const CreateChallengeSchema = z.object({
  file: multipartFileSchema,
});

export type CreateChallengeType = z.infer<typeof CreateChallengeSchema>;
