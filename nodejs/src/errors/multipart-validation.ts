import z from "zod";

export class MultipartValidationError extends Error {
  public issues: z.ZodIssue[];

  constructor(message: string, issues: z.ZodIssue[]) {
    super(message);
    this.name = "MultipartValidationError";
    this.issues = issues;
  }
}
