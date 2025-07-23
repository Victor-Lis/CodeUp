import { CategorySchema } from "@/schemas/category";

import { CategoryService } from "@/services/category";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function getCategoryById(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/:id",
    {
      schema: {
        summary: "Retrieve a category",
        tags: ["Category"],
        params: z.object({
          id: z.coerce.number(),
        }),
        response: {
          200: CategorySchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const category = await CategoryService.getCategoryById(id);
      reply.status(200).send(category);
    }
  );
}
