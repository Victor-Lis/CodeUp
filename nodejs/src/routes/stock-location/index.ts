import { FastifyTypedInstance } from "@/types/fastify";
import { getStockLocations } from "./get-all";
import { getStockLocationById } from "./get";
import { createStockLocation } from "./create";
import { updateStockLocation } from "./update";
import { deleteStockLocation } from "./delete";

export async function stockLocationRoutes(app: FastifyTypedInstance) {
  app.register(getStockLocations);
  app.register(getStockLocationById);
  app.register(createStockLocation);
  app.register(updateStockLocation);
  app.register(deleteStockLocation);
}
