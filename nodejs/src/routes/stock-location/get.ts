import { StockLocationSchema } from "@/schemas/stock-location";

import { StockItemLocationService } from "@/services/stock-location";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function getStockLocationById(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/:id",
    {
      schema: {
        summary: "Retrieve a stock location",
        tags: ["Stock Location"],
        params: z.object({
          id: z.coerce.number(),
        }),
        response: {
          200: StockLocationSchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const stockLocation = await StockItemLocationService.getStockLocationById(
        id
      );
      reply.status(200).send(stockLocation);
    }
  );
}
