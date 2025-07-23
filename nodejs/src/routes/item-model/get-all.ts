import { ItemModelSchema } from "@/schemas/item-model";

import { ItemModelService } from "@/services/item-model";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function getItemModels(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/",
    {
      schema: {
        summary: "Retrieve a list of item models",
        tags: ["Item Model"],
        response: {
          200: z.array(ItemModelSchema),
        },
      },
    },
    async (request, reply) => {
      const itemModels = await ItemModelService.getItemModels();
      reply.status(200).send(itemModels);
    }
  );
}
