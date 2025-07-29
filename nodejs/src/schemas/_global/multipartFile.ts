import z from "zod";
import type { MultipartFile } from "@fastify/multipart";

export const multipartFileSchema = z
  .custom<MultipartFile>((file) => file as MultipartFile, "Invalid file.")
  .refine((file) => file && file.filename, {
    message: "File is required.",
  });
