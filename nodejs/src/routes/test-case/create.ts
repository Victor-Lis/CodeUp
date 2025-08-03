import { TestCaseService } from "@/services/test-case";

import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { CreateTestCaseSchema } from "@/schemas/test-case/create";

export function createTestCase(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/",
    {
      schema: {
        summary: "Create a new test-case",
        tags: ["TestCase"],
        body: CreateTestCaseSchema,
        response: {
          201: z.object({
            message: z.string(),
            fileUrl: z.string().optional(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { input, expectedOutput, challengeId } = request.body;

      const testCase = await TestCaseService.createTestCase({
        input,
        expectedOutput,
        challengeId,
      });

      return reply.status(201).send({
        message: "Test-Case created successfully",
      });
    }
  );
}
