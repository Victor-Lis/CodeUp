import { UserSchema } from "@/schemas/user";
import { UserService } from "@/services/user";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function getUsers(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "s/",
    {
      schema: {
        summary: "Retrieve all operators",
        tags: ["User"],
        response: {
          200: z.array(UserSchema),
        },
      },
    },
    async (request, reply) => {
      const operators = await UserService.getUsers();
      reply.status(200).send(operators);
    }
  );
}
