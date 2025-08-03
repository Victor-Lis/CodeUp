import { TestCaseSchema } from "@/schemas/test-case";
import { TestCaseService } from "@/services/test-case";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function getTestCasesByChallengeId(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "s/challenge/:challengeId",
    {
      schema: {
        summary: "Retrieve all testcases",
        tags: ["TestCase"],
        params: z.object({
          challengeId: z.string().transform(Number),
        }),
        response: {
          200: z.array(TestCaseSchema),
        },
      },
    },
    async (request, reply) => {
      const { challengeId } = request.params;
      const testcases = await TestCaseService.getTestCasesByChallengeId(
        challengeId
      );
      reply.status(200).send(testcases);
    }
  );
}
