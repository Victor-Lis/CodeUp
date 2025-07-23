import { CreateStockSchema } from "@/schemas/stock/create";
import { StockSchema } from "@/schemas/stock";

import { StockService } from "@/services/stock";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { UpdateStockSchema } from "@/schemas/stock/update";
import { z } from "zod";

export function updateStock(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/:id",
    {
      schema: {
        summary: "Update a new stock",
        tags: ["Stock"],
        params: z.object({
          id: z.coerce.number(),
        }),
        body: UpdateStockSchema,
        response: {
          204: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const { name, locationId } = request.body;
      await StockService.updateStock(id, {
        name,
        locationId,
      });
      reply.status(204).send({
        message: "Stock  updated successfully",
      });
    }
  );
}
