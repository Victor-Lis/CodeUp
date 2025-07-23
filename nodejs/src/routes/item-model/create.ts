import { CreateItemModelSchema } from "@/schemas/item-model/create";

import { ItemModelService } from "@/services/item-model";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function createItemModel(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/",
    {
      schema: {
        summary: "Create a new item model",
        tags: ["Item Model"],
        body: CreateItemModelSchema,
        response: {
          201: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const data = request.body;

      const itemModel = await ItemModelService.createItemModel({
        ...data,
      });
      
      reply.status(201).send({
        message: "Model created successfully",
      });
    }
  );
}
