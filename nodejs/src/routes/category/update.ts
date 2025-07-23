import { CategoryService } from "@/services/category";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { UpdateCategorySchema } from "@/schemas/category/update";
import { z } from "zod";

export function updateCategory(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/:id",
    {
      schema: {
        summary: "Update a new category",
        tags: ["Category"],
        params: z.object({
          id: z.coerce.number(),
        }),
        body: UpdateCategorySchema,
        response: {
          204: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const { name, prefix, column, color } = request.body;
      await CategoryService.updateCategory(id, {
        name,
        column,
        prefix,
        color,
      });
      reply.status(204).send({
        message: "Category updated successfully",
      });
    }
  );
}
