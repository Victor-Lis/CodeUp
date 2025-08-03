import { RunService } from "@/services/run";

import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { parseAndValidateMultipart } from "@/utils/parseAndValidateMultipart";
import { CreateRunRouteSchema } from "@/schemas/run/create";
import { FilebaseService } from "@/services/firebase";

export function createRun(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/",
    {
      schema: {
        summary: "Create a new run with a file",
        tags: ["Run"],
        consumes: ["multipart/form-data"],
        // body: CreateRunSchema,
        response: {
          201: z.object({
            message: z.string(),
            fileUrl: z.string().optional(),
          }),
        },
      },
    },
    async (request, reply) => {
      const userId = request?.user?.id;
      
      const parts = request.parts();
      const { file, fields } = await parseAndValidateMultipart(
        parts,
        CreateRunRouteSchema
      );

      if (!file) {
        return reply.status(400).send({ message: "No file uploaded." });
      }

      const { challengeId } = fields;

      const nextRunNumber = await RunService.getNextRunNumber();

      const firebaseFile = await FilebaseService.uploadFile({
        path: `challenges/${challengeId}/runs/`,
        filename: `${nextRunNumber}`,
        file,
      });

      if (!firebaseFile) {
        return reply.status(400).send({
          message: "Failed to upload file to Firebase",
        });
      }

      await RunService.createRun({
        fileUrl: firebaseFile.fileUrl,
        challengeId,
        userId,
      });

      return reply.status(201).send({
        message: "Run created successfully",
      });
    }
  );
}