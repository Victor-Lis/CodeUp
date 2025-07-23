import { ItemModelSchema } from "@/schemas/item-model";

import { ItemModelService } from "@/services/item-model";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function getItemModelById(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/:id",
    {
      schema: {
        summary: "Retrieve an item model",
        tags: ["Item Model"],
        params: z.object({
          id: z.coerce.number(),
        }),
        response: {
          200: ItemModelSchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const itemModel = await ItemModelService.getItemModelById(id);
      reply.status(200).send(itemModel);
    }
  );
}
