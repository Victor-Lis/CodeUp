import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { TestCaseService } from "@/services/test-case";

export function deleteTestCase(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/:id",
    {
      schema: {
        summary: "Delete a testcase",
        tags: ["TestCase"],
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

      await TestCaseService.deleteTestCase(id);
      reply.status(204).send({
        message: "TestCase deleted successfully",
      });
    }
  );
}
