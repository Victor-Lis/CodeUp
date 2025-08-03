import { RunSchema } from "@/schemas/run";
import { RunService } from "@/services/run";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function getRunById(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/:runId",
    {
      schema: {
        summary: "Retrieve all runs",
        tags: ["Run"],
        params: z.object({
          runId: z.string().transform(Number),
        }),
        response: {
          200: RunSchema,
        },
      },
    },
    async (request, reply) => {
      const { runId } = request.params;
      const run = await RunService.getRunById(runId);
      console.log("Run retrieved:", run);
      reply.status(200).send(run as any);
    }
  );
}
