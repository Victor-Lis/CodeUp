import { z } from "zod";

export const TestCaseSchema = z.object({
  id: z.number().optional(),
  input: z.string().optional(),
  expectedOutput: z.string().optional(),
  challengeId: z.number().optional(),
  challenge: z.any().optional(),
  createdAt: z.date().optional(),
});

export type TestCaseType = z.infer<typeof TestCaseSchema>;