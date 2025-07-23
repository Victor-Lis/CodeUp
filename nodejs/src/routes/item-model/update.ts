import { ItemModelService } from "@/services/item-model";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { UpdateItemModelSchema } from "@/schemas/item-model/update";
import { z } from "zod";

export function updateItemModel(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/:id",
    {
      schema: {
        summary: "Update an new item model",
        tags: ["Item Model"],
        params: z.object({
          id: z.coerce.number(),
        }),
        body: UpdateItemModelSchema,
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

      const updatedItemModel = await ItemModelService.updateItemModel(id, {
        ...data,
      });
      
      reply.status(204).send({
        message: "Model updated successfully",
      });
    }
  );
}
