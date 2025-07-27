import { MultipartFile } from "@fastify/multipart";

type ParsedMultipartResult = {
  file: MultipartFile | null;
  fields: Record<string, any>;
};

export async function parseMultipartForm(
  parts: AsyncIterable<MultipartFile | any>
): Promise<ParsedMultipartResult> {
  let file: MultipartFile | null = null;
  const fields: Record<string, any> = {};

  for await (const part of parts) {
    if (part.type === "file") {
      console.log("Arquivo recebido:", part.fieldname);
      file = part;
      await file?.toBuffer(); // Consome o stream
    } else {
      console.log("Campo recebido:", part.fieldname, "=", part.value);
      fields[part.fieldname] = part.value;
    }
  }

  return { file, fields };
}
