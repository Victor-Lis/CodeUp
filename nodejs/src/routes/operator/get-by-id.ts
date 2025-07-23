import { OperatorSchema } from "@/schemas/operator";

import { OperatorService } from "@/services/operator";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function getOperatorById(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/:id",
    {
      schema: {
        summary: "Retrieve a operator",
        tags: ["Operator"],
        params: z.object({
          id: z.coerce.number(),
        }),
        response: {
          200: OperatorSchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const operator = await OperatorService.getOperatorById(id);
      reply.status(200).send(operator);
    }
  );
}
