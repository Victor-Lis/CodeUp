import { PaginatedResponseSchema, PaginationParamsSchema } from "@/schemas/_global/pagination";
import { ItemLocationSchema } from "@/schemas/item-location";

import { ItemLocationService } from "@/services/item-location";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function getItemLocations(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/",
    {
      schema: {
        summary: "Retrieve all locations",
        tags: ["Item Location"],
        querystring: PaginationParamsSchema,
        response: {
          200: PaginatedResponseSchema(ItemLocationSchema),
        },
      },
    },
    async (request, reply) => {
      const pagination = {
        page: request.query.page,
        pageSize: request.query.pageSize,
      };
      const itemLocation = await ItemLocationService.getItemLocations(pagination);
      reply.status(200).send(itemLocation);
    }
  );
}
