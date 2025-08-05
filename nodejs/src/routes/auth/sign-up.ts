import { InvalidCredentials } from "@/errors/invalid-credentials";
import { SignUpSchema } from "@/schemas/auth/sign-up";
import { AuthService } from "@/services/auth";

import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

// sub: data.id,
//       username: data.username,
//       name: data.name,
//       email: data.email,
//       type: data.operatorType,

export function signUp(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/sign-up",
    {
      schema: {
        summary: "Sign up an user",
        tags: ["Auth"],
        body: SignUpSchema,
        response: {
          200: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, credential, password } = request.body;

      const user = await AuthService.createUser({
        name,
        credential,
        password,
      });

      reply.send({
        message: "User created successfully",
      });
    }
  );
}
