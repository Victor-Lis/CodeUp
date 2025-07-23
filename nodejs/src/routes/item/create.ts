import { CreateItemSchema } from "@/schemas/item/create";

import { ItemService } from "@/services/item";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function createItem(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/",
    {
      schema: {
        summary: "Create a new item",
        tags: ["Item"],
        body: CreateItemSchema,
        response: {
          201: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const data = request.body;

      const userId = request?.user?.id;

      if (!userId) {
        reply.status(401).send({ message: "Unauthorized: user not found" });
        return;
      }

      await ItemService.createItem(data, userId);

      reply.status(201).send({
        message: "Item created successfully",
      });
    }
  );
}
