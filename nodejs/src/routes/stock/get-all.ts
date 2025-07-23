import { StockSchema } from "@/schemas/stock";
import { StockService } from "@/services/stock";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function getStocks(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/stock-location/:stockLocationId",
    {
      schema: {
        summary: "Retrieve all stocks",
        tags: ["Stock"],
        params: z.object({
          stockLocationId: z.coerce.number(),
        }),
        response: {
          200: z.array(StockSchema),
        },
      },
    },
    async (request, reply) => {
      const stockLocationId = request.params.stockLocationId;
      const stocks = await StockService.getStocksByStockLocationId(
        stockLocationId
      );
      reply.status(200).send(stocks);
    }
  );
}
