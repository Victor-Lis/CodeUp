import { ItemLocationService } from "@/services/item-location";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { UpdateItemLocationSchema } from "@/schemas/item-location/update";
import { z } from "zod";

export function updateItemLocation(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/:id",
    {
      schema: {
        summary: "Update a new item location",
        tags: ["Item Location"],
        params: z.object({
          id: z.coerce.number(),
        }),
        body: UpdateItemLocationSchema,
        response: {
          204: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const data = request.body;
      await ItemLocationService.updateItemLocation(id, data);
      reply.status(204).send({
        message: "Item Location updated successfully",
      });
    }
  );
}
