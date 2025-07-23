import { FastifyTypedInstance } from "@/types/fastify";
import { getItemLocations } from "./get-all";
import { getItemLocationById } from "./get";
import { createItemLocation } from "./create";
import { updateItemLocation } from "./update";
import { deleteItemLocation } from "./delete";

export async function itemLocationRoutes(app: FastifyTypedInstance) {
  app.register(getItemLocations);
  app.register(getItemLocationById);
  app.register(createItemLocation);
  app.register(updateItemLocation);
  app.register(deleteItemLocation);
}
