import { FastifyTypedInstance } from "@/types/fastify";
import { getMovementHistoriesByStock } from "./get-by-stock";
import { getMovementHistoriesByStockLocation } from "./get-by-stock-location";

export async function movementHistoryRoute(app: FastifyTypedInstance) {
  app.register(getMovementHistoriesByStock);
  app.register(getMovementHistoriesByStockLocation);
}
