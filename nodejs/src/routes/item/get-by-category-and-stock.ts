import { MaintenanceStatusEnum } from "@/schemas/_enums/maintenance-status";
import { PaginatedResponseSchema, PaginationParamsSchema } from "@/schemas/_global/pagination";
import { ItemSchema } from "@/schemas/item";
import { ItemService } from "@/services/item";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

const ItemsFiltersSchema = PaginationParamsSchema.extend({
  status: MaintenanceStatusEnum.optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  query: z.string().optional(),
});

export function getItemsByCategoryAndStockId(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/stock/:stockId/category/:categoryId",
    {
      schema: {
        summary: "Retrieve items by category and stock ID",
        tags: ["Item", "Category", "Stock"],
        querystring: ItemsFiltersSchema,
        params: z.object({
          stockId: z.coerce.number(),
          categoryId: z.coerce.number(),
        }),
        response: {
          200: PaginatedResponseSchema(ItemSchema),
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
        status: request.query.status,
        startDate: request.query.startDate
          ? new Date(request.query.startDate)
          : undefined,
        endDate: request.query.endDate
          ? new Date(request.query.endDate)
          : undefined,
        query: request.query.query,
      };

      if (filters.startDate) {
        filters.startDate.setHours(0, 0, 0, 0);
      }

      if (filters.endDate) {
        filters.endDate.setHours(23, 59, 59, 999);
      }

      const items = await ItemService.getItemsByCategoryAndStockId(
        stockId,
        categoryId,
        pagination,
        filters
      );
      reply.status(200).send(items);
    }
  );
}
