import { CreateStockLocationSchema } from "@/schemas/stock-location/create";

import { StockItemLocationService } from "@/services/stock-location";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function createStockLocation(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/",
    {
      schema: {
        summary: "Create a new stock location",
        tags: ["Stock Location"],
        body: CreateStockLocationSchema,
        response: {
          201: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, address } = request.body;
      await StockItemLocationService.createStockLocation({
        name,
        address,
      });
      reply.status(201).send({
        message: "Stock location created successfully",
      });
    }
  );
}
