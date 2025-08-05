import { InvalidCredentials } from "@/errors/invalid-credentials";
import { SignInSchema } from "@/schemas/auth/sign-in";
import { AuthService } from "@/services/auth";

import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

// sub: data.id,
//       username: data.username,
//       name: data.name,
//       email: data.email,
//       type: data.userType,

export function signIn(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/sign-in",
    {
      schema: {
        summary: "Sign in an user",
        tags: ["Auth"],
        body: SignInSchema,
        response: {
          200: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { credential, password } = request.body;

      // console.log("[Auth] Sign in attempt with credential:", credential);
      // console.log("[Auth] Sign in attempt with password:", password ? "******" : "not provided");

      const user = await AuthService.verifyUser(credential, password);

      if (!user) {
        throw new InvalidCredentials();
      }

      const token = await AuthService.login(user);

      console.log("🔑 Token gerado:", token);

      reply.send({
        token,
      });
    }
  );
}
