import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { ChallengeService } from "@/services/challenge";

export function deleteChallenge(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/:id",
  {
      schema: {
        summary: "Delete a challenge",
        tags: ["Challenge"],
        params: z.object({
          id: z.coerce.number(),
        }),
        response: {
          204: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      await ChallengeService.deleteChallenge(id);
      reply.status(204).send({
        message: "Challenge deleted successfully",
      });
    }
  );
}
