import { multipartFileSchema } from "@/schemas/_global/multipartFile";
import { RunService } from "@/services/run";
import { FilebaseService } from "@/services/firebase";

import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { parseAndValidateMultipart } from "@/utils/parseAndValidateMultipart";
import { UpdateRunRouteSchema } from "@/schemas/run/update";

export function updateRun(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/:id",
    {
      schema: {
        summary: "Update an existing run",
        tags: ["Run"],
        consumes: ["multipart/form-data"],
        params: z.object({
          id: z.coerce.number(),
        }),
        // body: UpdateRunSchema,
        response: {
          200: z.object({
            message: z.string(),
            fileUrl: z.string().optional(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      const parts = request.parts();
      const { file, fields } = await parseAndValidateMultipart(
        parts,
        UpdateRunRouteSchema
      );

      const existingRun = await RunService.getRunById(id);

      let firebaseUrl = existingRun?.fileUrl;
      if (file) {
        const fileValidation = multipartFileSchema.safeParse(file);

        const firebaseFile = await FilebaseService.uploadFile({
          path: `challenges/${existingRun.challengeId}/runs/`,
          filename: `${id}`,
          file,
        });

        await FilebaseService.deleteFile({
          fileUrl: existingRun.fileUrl,
        });

        firebaseUrl = firebaseFile?.fileUrl
          ? firebaseFile.fileUrl
          : existingRun.fileUrl;
      }

      const run = await RunService.updateRun(id, {
        approved: Boolean(fields.approved)
          ? fields.approved
          : existingRun.approved,
        fileUrl: firebaseUrl,
      });

      return reply.status(200).send({
        message: "Run updated successfully",
      });
    }
  );
}
