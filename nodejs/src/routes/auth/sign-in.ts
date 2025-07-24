import { InvalidCredentials } from "@/errors/invalid-credentials";
import { AuthSchema } from "@/schemas/auth";
import { AuthService } from "@/services/auth";

import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

// sub: data.id,
//       username: data.username,
//       name: data.name,
//       email: data.email,
//       type: data.operatorType,

export function signIn(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/sign-in",
    {
      schema: {
        summary: "Sign in an operator",
        tags: ["Auth"],
        body: AuthSchema,
        response: {
          200: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { credential, password } = request.body;

      console.log("[Auth] Sign in attempt with credential:", credential);
      console.log("[Auth] Sign in attempt with password:", password ? "******" : "not provided");

      const operator = await AuthService.verifyUser(credential, password);

      if (!operator) {
        throw new InvalidCredentials();
      }

      const token = await AuthService.login(operator);

      // console.log("🔑 Token gerado:", token);

      reply.send({
        token,
      });
    }
  );
}
