import { z } from "zod";

export const CreateTestCaseSchema = z.object({
  input: z.string(),
  expectedOutput: z.string(),
  challengeId: z.number(),
});

export type CreateTestCaseType = z.infer<typeof CreateTestCaseSchema>;