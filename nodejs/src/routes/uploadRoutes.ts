import { FastifyTypedInstance } from "@/types/fastify";
import { parseMultipartForm } from "@/utils/parseMultipartForm";
import { MultipartFile } from "@fastify/multipart";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export async function uploadRoutes(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/upload/file",
    {
      schema: {
        summary: "Faz upload de um ficheiro com dados adicionais",
        tags: ["Upload"],
        consumes: ["multipart/form-data"],
        response: {
          200: z.object({
            message: z.string(),
            filename: z.string(),
            body: z.any(),
          }),
          400: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const parts = request.parts();
      const { file, fields } = await parseMultipartForm(parts);
      console.log("Campos recebidos:", fields);
      console.log("Ficheiro recebido:", file?.filename);

      if (!file) {
        return reply.status(400).send({ message: "Nenhum ficheiro enviado." });
      }

      return reply.send({
        message: "Upload bem-sucedido",
        filename: file?.filename,
        body: fields,
      });
    }
  );
}
