import { CreateChallengeSchema } from "@/schemas/challenge/create";
import { ChallengeService } from "@/services/challenge";
import { FilebaseFileService } from "@/services/firebase-file";

import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function createChallenge(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/",
    {
      schema: {
        summary: "Create a new challenge",
        tags: ["Challenge"],
        body: CreateChallengeSchema,
        response: {
          201: z.object({
            message: z.string(),
            fileUrl: z.string().optional(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { file } = request.body;

      const nextChallengeNumber = await ChallengeService.getNextChallengeNumber();

      const firebaseFile = await FilebaseFileService.uploadImage({
        path: `challenges/${nextChallengeNumber}/`,
        file,
      });

      if (!firebaseFile) {
        return reply.status(400).send({
          message: "Failed to upload file to Firebase",
        });
      }

      const challenge = await ChallengeService.createChallenge({
        ...request.body,
        fileUrl: firebaseFile?.fileUrl,
      });

      return reply.status(201).send({
        message: "Challenge created successfully",
      });
    }
  );
}
