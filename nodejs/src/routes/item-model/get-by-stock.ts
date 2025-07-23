import {
  PaginatedResponseSchema,
  PaginationParamsSchema,
} from "@/schemas/_global/pagination";
import { ItemModelSchema } from "@/schemas/item-model";

import { ItemModelService } from "@/services/item-model";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

const ItemModelsFilterSchema = PaginationParamsSchema.extend({
  query: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export function getItemModelsByStockId(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/stock/:stockId/category/:categoryId",
    {
      schema: {
        summary: "Retrieve all item models",
        tags: ["Item Model"],
        params: z.object({
          stockId: z.coerce.number(),
          categoryId: z.coerce.number(),
        }),
        querystring: ItemModelsFilterSchema,
        response: {
          200: PaginatedResponseSchema(ItemModelSchema),
        },
      },
    },
    async (request, reply) => {
      const { stockId, categoryId } = request.params;

      const pagination = {
        page: request.query.page,
        pageSize: request.query.pageSize,
      };

      const filters = {
        query: request.query.query,
        startDate: request.query.startDate
          ? new Date(request.query.startDate)
          : undefined,
        endDate: request.query.endDate
          ? new Date(request.query.endDate)
          : undefined,
      };

      const itemModel = await ItemModelService.getItemModelsByStockAndCategoryId(
        stockId,
        categoryId,
        pagination,
        filters
      );
      reply.status(200).send(itemModel);
    }
  );
}
