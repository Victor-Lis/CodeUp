import { FastifyTypedInstance } from "@/types/fastify";
import { getTechnicians } from "./get-all";

import { getTechnicianById } from "./get";
import { createTechnician } from "./create";
import { updateTechnician } from "./update";
import { deleteTechnician } from "./delete";

export async function technicianRoutes(app: FastifyTypedInstance) {
  app.register(getTechnicians);
  app.register(getTechnicianById);
  app.register(createTechnician);
  app.register(updateTechnician);
  app.register(deleteTechnician);
}
