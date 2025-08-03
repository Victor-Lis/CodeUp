import { FastifyTypedInstance } from "@/types/fastify";
import { createRun } from "./create";
import { updateRun } from "./update";
import { validateRun } from "./validate";

export async function runRoutes(app: FastifyTypedInstance) {
  app.register(createRun);
  app.register(updateRun);
  app.register(validateRun);
}
