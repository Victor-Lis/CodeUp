import { OperatorSchema } from "@/schemas/operator";

import { OperatorService } from "@/services/operator";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function getOperatorByUsername(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/username/:username",
    {
      schema: {
        summary: "Retrieve a operator",
        tags: ["Operator"],
        params: z.object({
          username: z.string(),
        }),
        response: {
          200: OperatorSchema,
        },
      },
    },
    async (request, reply) => {
      const { username } = request.params;
      const operator = await OperatorService.getOperatorByUsername(username);
      reply.status(200).send(operator);
    }
  );
}
