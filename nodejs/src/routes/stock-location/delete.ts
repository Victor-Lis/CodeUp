import { StockLocationSchema } from "@/schemas/stock-location";

import { StockItemLocationService } from "@/services/stock-location";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function deleteStockLocation(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/:id",
    {
      schema: {
        summary: "Delete a stock location",
        tags: ["Stock Location"],
        params: z.object({
          id: z.coerce.number(),
        }),
        response: {
          204: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      console.log("Deleting stock location with ID:", id);
      await StockItemLocationService.deleteStockLocation(id);
      reply.status(200).send({
        message: "Stock location deleted successfully",
      });
    }
  );
}
