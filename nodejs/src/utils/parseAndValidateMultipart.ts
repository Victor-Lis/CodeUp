import { MultipartValidationError } from "@/errors/multipart-validation";
import { MultipartFile } from "@fastify/multipart";
import z from "zod";

export async function parseAndValidateMultipart<T extends z.ZodTypeAny>(
  parts: AsyncIterable<MultipartFile | any>,
  schema: T
): Promise<{ file: MultipartFile | null; fields: z.infer<T> }> {
  let file: MultipartFile | null = null;
  const rawFields: Record<string, any> = {};

  for await (const part of parts) {
    if (part.type === "file") {
      file = part;
      await file?.toBuffer();
    } else {
      const key = part.fieldname;
      const value = part.value;

      if (rawFields[key] === undefined) {
        rawFields[key] = value;
      } else {
        if (!Array.isArray(rawFields[key])) {
          rawFields[key] = [rawFields[key]];
        }
        rawFields[key].push(value);
      }
    }
  }

  const validationResult = schema.safeParse(rawFields);

  if (!validationResult.success) {
    throw new MultipartValidationError(
      "A validação dos campos do formulário falhou.",
      validationResult.error.issues
    );
  }

  return { file, fields: validationResult.data };
}
