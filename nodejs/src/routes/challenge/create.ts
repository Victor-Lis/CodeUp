import { multipartFileSchema } from "@/schemas/_global/multipartFile";
import { ChallengeService } from "@/services/challenge";
import { FilebaseService } from "@/services/firebase";

import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function createChallenge(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/",
    {
      schema: {
        summary: "Create a new challenge with a file",
        tags: ["Challenge"],
        consumes: ["multipart/form-data"],
        // body: CreateChallengeSchema,
        response: {
          201: z.object({
            message: z.string(),
            fileUrl: z.string().optional(),
          }),
        },
      },
    },
    async (request, reply) => {
      const requestFile = await request.file();
      const file = multipartFileSchema.parse(requestFile);

      const nextChallengeNumber =
        await ChallengeService.getNextChallengeNumber();

      const firebaseFile = await FilebaseService.uploadFile({
        path: `challenges/${nextChallengeNumber}/`,
        file,
      });

      if (!firebaseFile) {
        return reply.status(400).send({
          message: "Failed to upload file to Firebase",
        });
      }

      const challenge = await ChallengeService.createChallenge({
        fileUrl: firebaseFile?.fileUrl,
      });

      return reply.status(201).send({
        message: "Challenge created successfully",
      });
    }
  );
}
