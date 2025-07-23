import { StockLocationSchema } from "@/schemas/stock-location";

import { StockItemLocationService } from "@/services/stock-location";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function getStockLocations(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/",
    {
      schema: {
        summary: "Retrieve all stock locations",
        tags: ["Stock Location"],
        response: {
          200: z.array(StockLocationSchema),
        },
      },
    },
    async (request, reply) => {
      const stockLocation = await StockItemLocationService.getStockLocations();
      reply.status(200).send(stockLocation);
    }
  );
}
