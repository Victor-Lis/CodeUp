import { OperatorSchema } from "@/schemas/operator";
import { OperatorService } from "@/services/operator";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function getOperators(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/",
    {
      schema: {
        summary: "Retrieve all operators",
        tags: ["Operator"],
        response: {
          200: z.array(OperatorSchema),
        },
      },
    },
    async (request, reply) => {
      const operators = await OperatorService.getOperators();
      reply.status(200).send(operators);
    }
  );
}
