import { PaginatedResponseSchema, PaginationParamsSchema } from "@/schemas/_global/pagination";
import { ItemSchema } from "@/schemas/item";
import { ItemService } from "@/services/item";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function getItems(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/",
    {
      schema: {
        summary: "Retrieve all items",
        tags: ["Item"],
        querystring: PaginationParamsSchema,
        response: {
          200: PaginatedResponseSchema(ItemSchema),
        },
      },
    },
    async (request, reply) => {
      const { page, pageSize } = request.query;

      const response = await ItemService.getItems({
        page,
        pageSize,
      });

      reply.status(200).send(response);
    }
  );
}
