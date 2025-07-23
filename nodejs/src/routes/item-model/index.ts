import { FastifyTypedInstance } from "@/types/fastify";
import { getItemModelsByStockId } from "./get-by-stock";
import { getItemModels } from "./get-all";
import { getItemModelById } from "./get";
import { createItemModel } from "./create";
import { updateItemModel } from "./update";
import { deleteItemModel } from "./delete";

export async function itemModelRoutes(app: FastifyTypedInstance) {
  app.register(getItemModels);
  app.register(getItemModelsByStockId);
  app.register(getItemModelById);
  app.register(createItemModel);
  app.register(updateItemModel);
  app.register(deleteItemModel);
}