import { TestCaseService } from "@/services/test-case";

import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { UpdateTestCaseSchema } from "@/schemas/test-case/update";

export function updateTestCase(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/:id",
    {
      schema: {
        summary: "Update a test-case",
        tags: ["TestCase"],
        params: z.object({
          id: z.string().transform(Number),
        }),
        body: UpdateTestCaseSchema,
        response: {
          201: z.object({
            message: z.string(),
            fileUrl: z.string().optional(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const { input, expectedOutput } = request.body;

      const testCase = await TestCaseService.updateTestCase(id, {
        input,
        expectedOutput,
      });

      return reply.status(201).send({
        message: "Test-Case updated successfully",
      });
    }
  );
}
