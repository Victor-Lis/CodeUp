import { CreateItemSchema } from "@/schemas/item/create";

import { ItemService } from "@/services/item";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function createManyItems(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/many/:quantity",
    {
      schema: {
        summary: "Create new items",
        tags: ["Item"],
        params: z.object({
          quantity: z.coerce
            .number()
            .positive()
            .int()
            .describe("Number of items to create"),
        }),
        body: CreateItemSchema,
        response: {
          201: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { quantity } = request.params;
      const data = request.body;

      const userId = request?.user?.id;

      if (!userId) {
        reply.status(401).send({ message: "Unauthorized: user not found" });
        return;
      }

      await ItemService.createItems(data, quantity, userId);
      reply.status(201).send({
        message: "Item created successfully",
      });
    }
  );
}
