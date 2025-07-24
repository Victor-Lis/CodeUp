import { CreateUserSchema } from "@/schemas/user/create";
import { AuthService } from "@/services/auth";

import { UserService } from "@/services/user";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function createUser(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/",
    {
      schema: {
        summary: "Create a new operator",
        tags: ["User"],
        body: CreateUserSchema,
        response: {
          201: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email, password, username, isActive, operatorType } = request.body;
      await UserService.createUser({
        name,
        username,
        email,
        password,
        isActive,
        operatorType,
      });
      reply.status(201).send({
        message: "User created successfully",
      });
    }
  );
}
