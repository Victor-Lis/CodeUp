import { ItemLocationSchema } from "@/schemas/item-location";

import { ItemLocationService } from "@/services/item-location";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function getItemLocationById(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/:id",
    {
      schema: {
        summary: "Retrieve a location",
        tags: ["Item Location"],
        params: z.object({
          id: z.coerce.number(),
        }),
        response: {
          200: ItemLocationSchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const itemLocation = await ItemLocationService.getItemLocationById(id);
      reply.status(200).send(itemLocation);
    }
  );
}
