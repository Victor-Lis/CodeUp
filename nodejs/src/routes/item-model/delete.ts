import { ItemModelSchema } from "@/schemas/item-model";

import { ItemModelService } from "@/services/item-model";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function deleteItemModel(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/:id",
    {
      schema: {
        summary: "Delete an item model",
        tags: ["Item Model"],
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
      await ItemModelService.deleteItemModel(id);
      reply.status(200).send({
        message: "Model deleted successfully",
      });
    }
  );
}
