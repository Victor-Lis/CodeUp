import { UserSchema } from "@/schemas/user";

import { UserService } from "@/services/user";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function getUserByUsername(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/username/:username",
    {
      schema: {
        summary: "Retrieve a operator",
        tags: ["User"],
        params: z.object({
          username: z.string(),
        }),
        response: {
          200: UserSchema,
        },
      },
    },
    async (request, reply) => {
      const { username } = request.params;
      const operator = await UserService.getUserByUsername(username);
      reply.status(200).send(operator);
    }
  );
}
