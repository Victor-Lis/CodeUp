import { UserService } from "@/services/user";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { UpdateUserSchema } from "@/schemas/user/update";
import { z } from "zod";

export function updateUser(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/:id",
    {
      schema: {
        summary: "Update a new user ",
        tags: ["User"],
        params: z.object({
          id: z.coerce.number(),
        }),
        body: UpdateUserSchema,
        response: {
          204: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const { name, email, password, username, userType, isActive } = request.body;
      await UserService.updateUser(id, {
        name,
        username,
        email,
        password,
        userType,
        isActive,
      });
      reply.status(204).send({
        message: "User updated successfully",
      });
    }
  );
}
