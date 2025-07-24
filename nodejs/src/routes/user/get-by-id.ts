import { UserSchema } from "@/schemas/user";

import { UserService } from "@/services/user";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function getUserById(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/:id",
    {
      schema: {
        summary: "Retrieve a operator",
        tags: ["User"],
        params: z.object({
          id: z.coerce.number(),
        }),
        response: {
          200: UserSchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const operator = await UserService.getUserById(id);
      reply.status(200).send(operator);
    }
  );
}
