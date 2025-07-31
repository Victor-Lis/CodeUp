import { ChallengeSchema } from "@/schemas/challenge";
import { ChallengeService } from "@/services/challenge";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function getChallenges(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "s/",
    {
      schema: {
        summary: "Retrieve all challenges",
        tags: ["Challenge"],
        response: {
          200: z.array(ChallengeSchema), 
        },
      },
    },
    async (request, reply) => {
      const challenges = await ChallengeService.getChallenges();
      reply.status(200).send(challenges);
    }
  );
}
