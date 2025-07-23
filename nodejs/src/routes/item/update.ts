import { ItemService } from "@/services/item";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { UpdateItemSchema } from "@/schemas/item/update";
import { z } from "zod";

export function updateItem(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/:id",
    {
      schema: {
        summary: "Update a new item",
        tags: ["Item"],
        params: z.object({
          id: z.coerce.number(),
        }),
        body: UpdateItemSchema,
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

      const userId = request?.user?.id;

      if (!userId) {
        reply.status(401).send({ message: "Unauthorized: user not found" });
        return;
      }

      await ItemService.updateItem(id, data, userId);
      
      reply.status(204).send({
        message: "Item updated successfully",
      });
    }
  );
}
