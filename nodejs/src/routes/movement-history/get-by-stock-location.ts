import {
  PaginatedResponseSchema,
  PaginationParamsSchema,
} from "@/schemas/_global/pagination";
import { MovementHistorySchema } from "@/schemas/movement-history";
import { MovementHistoryService } from "@/services/movement-history";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function getMovementHistoriesByStockLocation(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/stock-location/:stockLocationId",
    {
      schema: {
        summary: "Retrieve all movement histories by stock location",
        tags: ["Movement History"],
        querystring: PaginationParamsSchema,
        params: z.object({
          stockLocationId: z.coerce
            .number()
            .int()
            .positive()
            .describe("ID of the stock location"),
        }),
        response: {
          200: PaginatedResponseSchema(MovementHistorySchema),
        },
      },
    },
    async (request, reply) => {
      const { page, pageSize } = request.query;
      const { stockLocationId } = request.params;
      const movementHistories =
        await MovementHistoryService.getMovementHistoriesByStockLocationId(
          stockLocationId,
          { page, pageSize }
        );
      reply.status(200).send(movementHistories);
    }
  );
}
