import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function signOut(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/sign-out",
    {
      schema: {
        summary: "Sign out an operator",
        tags: ["Auth"],
        response: {
          204: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      reply.status(204).send({
        message: "Successfully signed out",
      });
    }
  );
}
