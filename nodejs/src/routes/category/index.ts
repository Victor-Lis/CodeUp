import { FastifyTypedInstance } from "@/types/fastify";
import { getCategories } from "./get-all";
import { getCategoryById } from "./get";
import { createCategory } from "./create";
import { updateCategory } from "./update";
import { deleteCategory } from "./delete";

export async function categoryRoutes(app: FastifyTypedInstance) {
  app.register(getCategories);
  app.register(getCategoryById);
  app.register(createCategory);
  app.register(updateCategory);
  app.register(deleteCategory);
}
