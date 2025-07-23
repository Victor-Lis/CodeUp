import { ItemService } from "@/services/item";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function getItemsCountByStockId(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/stock/:stockId/count/",
    {
      schema: {
        summary: "Retrieve a items count by stock ID",
        tags: ["Item", "Category"],
        params: z.object({
          stockId: z.coerce.number(),
        }),
        response: {
          200: z.number().describe("Count of items in the stock"),
        },
      },
    },
    async (request, reply) => {
      const { stockId } = request.params;
      const itemsCount = await ItemService.countItemsByStockId(stockId);
      reply.status(200).send(itemsCount);
    }
  );
}
