import { z } from "zod";

export const UpdateTestCaseSchema = z.object({
  input: z.string().optional(),
  expectedOutput: z.string().optional(),
});

export type UpdateTestCaseType = z.infer<typeof UpdateTestCaseSchema>;