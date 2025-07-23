import { CreateItemLocationSchema } from "@/schemas/item-location/create";

import { ItemLocationService } from "@/services/item-location";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function createItemLocation(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/",
    {
      schema: {
        summary: "Create a new item location",
        tags: ["Item Location"],
        body: CreateItemLocationSchema,
        response: {
          201: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const data = request.body;
      await ItemLocationService.createItemLocation(data);
      reply.status(201).send({
        message: "Item location created successfully",
      });
    }
  );
}
