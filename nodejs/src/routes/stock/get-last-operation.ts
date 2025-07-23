import { MovementHistorySchema } from "@/schemas/movement-history";
import { StockService } from "@/services/stock";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function getLastOperation(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/:id/last-operation",
    {
      schema: {
        summary: "Retrieve last operation of a stock",
        tags: ["Stock", "Movement History"],
        params: z.object({
          id: z.coerce.number(),
        }),
        response: {
          200: MovementHistorySchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const movement = await StockService.getLastOperationByStockId(id);
      reply.status(200).send(movement);
    }
  );
}
