import { FastifyTypedInstance } from "@/types/fastify";
import { getStocks } from "./get-all";
import { getStockById } from "./get";
import { createStock } from "./create";
import { updateStock } from "./update";
import { getLastOperation } from "./get-last-operation";
import { deleteStock } from "./delete";

export async function stockRoutes(app: FastifyTypedInstance) {
  app.register(getLastOperation);
  app.register(getStocks);
  app.register(getStockById);
  app.register(createStock);
  app.register(updateStock);
  app.register(deleteStock);
}
