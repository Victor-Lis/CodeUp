import { CreateStockLocationSchema } from "@/schemas/stock-location/create";
import { StockLocationSchema } from "@/schemas/stock-location";

import { StockItemLocationService } from "@/services/stock-location";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { UpdateStockLocationSchema } from "@/schemas/stock-location/update";
import { z } from "zod";

export function updateStockLocation(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/:id",
    {
      schema: {
        summary: "Update a new stock location",
        tags: ["Stock Location"],
        params: z.object({
          id: z.coerce.number(),
        }),
        body: UpdateStockLocationSchema,
        response: {
          204: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const { name, address } = request.body;
      await StockItemLocationService.updateStockLocation(id, {
        name,
        address,
      });
      reply.status(204).send({
        message: "Stock location updated successfully",
      });
    }
  );
}
