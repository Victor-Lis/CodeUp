import { SignInSchema } from "@/schemas/auth/sign-in";
import { AuthService } from "@/services/auth";

import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function verifyPassword(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/verify-password",
    {
      schema: {
        summary: "Verify an user",
        tags: ["Auth"],
        body: SignInSchema,
        response: {
          200: z.object({
            match: z.boolean(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { credential, password } = request.body;

      const operator = await AuthService.verifyUser(credential, password);

      reply.send({
        match: !!operator,
      });
    }
  );
}
