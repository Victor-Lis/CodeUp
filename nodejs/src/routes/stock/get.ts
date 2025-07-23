import { StockSchema } from "@/schemas/stock";

import { StockService } from "@/services/stock";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function getStockById(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/:id",
    {
      schema: {
        summary: "Retrieve a stock",
        tags: ["Stock"],
        params: z.object({
          id: z.coerce.number(),
        }),
        response: {
          200: StockSchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const stock = await StockService.getStockById(id);
      reply.status(200).send(stock);
    }
  );
}
