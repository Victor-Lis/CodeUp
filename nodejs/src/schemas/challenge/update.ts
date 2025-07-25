import { z } from "zod";
import { FirebaseFileSchema } from "../firebase-file";

export const UpdateChallengeSchema = z.object({
  file: FirebaseFileSchema.optional(),
});

export type UpdateChallengeType = z.infer<typeof UpdateChallengeSchema>;
