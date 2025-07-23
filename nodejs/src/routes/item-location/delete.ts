import { ItemLocationSchema } from "@/schemas/item-location";

import { ItemLocationService } from "@/services/item-location";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function deleteItemLocation(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/:id",
    {
      schema: {
        summary: "Delete a location",
        tags: ["Item Location"],
        params: z.object({
          id: z.coerce.number(),
        }),
        response: {
          204: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      await ItemLocationService.deleteItemLocation(id);
      reply.status(200).send({
        message: "Location deleted successfully",
      });
    }
  );
}
