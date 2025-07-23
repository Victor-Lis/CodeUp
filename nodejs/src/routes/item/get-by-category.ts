import { getItemByCategoryIdSchema } from "@/schemas/item";
import { ItemService } from "@/services/item";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function getItemByCategoryId(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/category/:id",
    {
      schema: {
        summary: "Retrieve a item by category",
        tags: ["Item", "Category"],
        params: z.object({
          categoryId: z.coerce.number(),
        }),
        response: {
          200: z.array(getItemByCategoryIdSchema),
        },
      },
    },
    async (request, reply) => {
      const { categoryId } = request.params;
      const item = await ItemService.getItemsByCategoryId(categoryId);
      reply.status(200).send(item);
    }
  );
}
