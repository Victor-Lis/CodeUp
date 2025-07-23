import {
  PaginatedResponseSchema,
  PaginationParamsSchema,
} from "@/schemas/_global/pagination";
import { MovementHistorySchema } from "@/schemas/movement-history";
import { MovementHistoryService } from "@/services/movement-history";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

const MovementFiltersSchema = PaginationParamsSchema.extend({
  type: z.enum(["IN", "OUT"]).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  query: z.string().optional(),
});

export function getMovementHistoriesByStock(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/stock/:stockId",
    {
      schema: {
        summary: "Retrieve all movement histories by stock",
        tags: ["Movement History"],
        querystring: MovementFiltersSchema,
        params: z.object({
          stockId: z.coerce
            .number()
            .int()
            .positive()
            .describe("ID of the stock"),
        }),
        response: {
          200: PaginatedResponseSchema(MovementHistorySchema),
        },
      },
    },
    async (request, reply) => {
      const pagination = {
        page: request.query.page,
        pageSize: request.query.pageSize,
      };
      const filters = {
        type: request.query.type,
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

      const { stockId } = request.params;
      const movementHistories =
        await MovementHistoryService.getMovementHistoriesByStockId(
          stockId,
          pagination,
          filters
        );

      reply.status(200).send(movementHistories);
    }
  );
}
