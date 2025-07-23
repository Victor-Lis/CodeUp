import { ItemSchema } from "@/schemas/item";
import { ItemService } from "@/services/item";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function getItemById(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/items/:id",
    {
      schema: {
        summary: "Retrieve a item",
        tags: ["Item"],
        params: z.object({
          id: z.coerce.number(),
        }),
        response: {
          200: ItemSchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const item = await ItemService.getItemById(id);
      reply.status(200).send(item);
    }
  );
}
