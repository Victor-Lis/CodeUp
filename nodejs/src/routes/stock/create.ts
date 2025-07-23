import { CreateStockSchema } from "@/schemas/stock/create";

import { StockService } from "@/services/stock";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function createStock(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/",
    {
      schema: {
        summary: "Create a new stock ",
        tags: ["Stock"],
        body: CreateStockSchema,
        response: {
          201: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, stockLocationId } = request.body;
      await StockService.createStock({
        name,
        stockLocationId,
      });
      reply.status(201).send({
        message: "Stock created successfully",
      });
    }
  );
}
