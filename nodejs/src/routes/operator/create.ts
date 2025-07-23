import { CreateOperatorSchema } from "@/schemas/operator/create";
import { AuthService } from "@/services/auth";

import { OperatorService } from "@/services/operator";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function createOperator(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/",
    {
      schema: {
        summary: "Create a new operator",
        tags: ["Operator"],
        body: CreateOperatorSchema,
        response: {
          201: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email, password, username, isActive, operatorType } = request.body;
      await OperatorService.createOperator({
        name,
        username,
        email,
        password,
        isActive,
        operatorType,
      });
      reply.status(201).send({
        message: "Operator created successfully",
      });
    }
  );
}
