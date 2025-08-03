import { RunService } from "@/services/run";

import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { api } from "@/lib/axios";
import { ValidationType } from "@/schemas/run/validation";

export function validateRun(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/:id/validate",
    {
      schema: {
        summary: "Validate an existing run",
        tags: ["Run"],
        params: z.object({
          id: z.coerce.number(),
        }),
        // body: ValidateRunSchema,
        response: {
          200: z.object({
            message: z.string(),
            error: z.string().optional(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      const { data: validation } = await api.get<ValidationType>(
        `/?runId=${id}`
      );

      const run = await RunService.updateRun(id, {
        approved: validation.approved,
      });

      if (!validation.approved) {
        return reply.status(400).send({
          message: "Run validation failed",
          error: validation.error || "Unknown error",
        });
      }

      return reply.status(200).send({
        message: "Run validated successfully",
      });
    }
  );
}
