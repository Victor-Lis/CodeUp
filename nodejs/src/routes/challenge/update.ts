import { UpdateChallengeSchema } from "@/schemas/challenge/update";
import { ChallengeService } from "@/services/challenge";
import { FilebaseFileService } from "@/services/firebase-file";

import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function updateChallenge(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/:id",
    {
      schema: {
        summary: "Update an existing challenge",
        tags: ["Challenge"],
        params: z.object({
          id: z.coerce.number(),
        }),
        body: UpdateChallengeSchema,
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
      const { file } = request.body;

      const existingChallenge = await ChallengeService.getChallengeById(id);
      if (!existingChallenge) {
        return reply.status(404).send({
          message: "Challenge not found",
        });
      }

      if (file) {
        await FilebaseFileService.deleteImage({
          fileUrl: existingChallenge.fileUrl,
        });

        const firebaseFile = await FilebaseFileService.uploadImage({
          path: `challenges/${id}/`,
          file,
        });

        if (!firebaseFile?.fileUrl) {
          return reply.status(400).send({
            message: "Failed to upload file to Firebase",
          });
        }

        const challenge = await ChallengeService.updateChallenge(id, {
          ...request.body,
          fileUrl: firebaseFile?.fileUrl,
        });

        return reply.status(200).send({
          message: "Challenge updated successfully",
        });
      }
    }
  );
}
