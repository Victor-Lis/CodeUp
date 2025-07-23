import { OperatorService } from "@/services/operator";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { UpdateOperatorSchema } from "@/schemas/operator/update";
import { z } from "zod";

export function updateOperator(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/:id",
    {
      schema: {
        summary: "Update a new operator ",
        tags: ["Operator"],
        params: z.object({
          id: z.coerce.number(),
        }),
        body: UpdateOperatorSchema,
        response: {
          204: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const { name, email, password, username, operatorType, isActive } = request.body;
      await OperatorService.updateOperator(id, {
        name,
        username,
        email,
        password,
        operatorType,
        isActive,
      });
      reply.status(204).send({
        message: "Operator updated successfully",
      });
    }
  );
}
