import { FastifyTypedInstance } from "@/types/fastify";
import { getItems } from "./get-all";
import { getItemById } from "./get";
import { createItem } from "./create";
import { updateItem } from "./update";
import { getItemByCategoryId } from "./get-by-category";
import { getItemsCountByStockId } from "./get-count-by-stock";
import { createManyItems } from "./create-many";
import { getItemsByCategoryAndStockId } from "./get-by-category-and-stock";

export async function itemRoutes(app: FastifyTypedInstance) {
  app.register(getItems);
  // app.register(getItemById);
  app.register(getItemByCategoryId);
  app.register(createItem);
  app.register(createManyItems);
  app.register(updateItem);
  app.register(getItemsCountByStockId);
  app.register(getItemsByCategoryAndStockId);
}
