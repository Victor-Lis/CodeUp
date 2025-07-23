import { CreateStockSchema } from "@/schemas/stock/create";
import { StockSchema } from "@/schemas/stock";

import { StockService } from "@/services/stock";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function deleteStock(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/:id",
    {
      schema: {
        summary: "Delete a new stock",
        tags: ["Stock"],
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
      await StockService.deleteStock(id);
      reply.status(204).send({
        message: "Stock deleted successfully",
      });
    }
  );
}
