import { z } from "zod";
import { FirebaseFileSchema } from "../firebase-file";

export const CreateChallengeSchema = z.object({
  file: FirebaseFileSchema
});

export type CreateChallengeType = z.infer<typeof CreateChallengeSchema>;
