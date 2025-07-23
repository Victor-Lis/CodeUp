import { FastifyTypedInstance } from "@/types/fastify";
import { getOperators } from "./get-all";
import { getOperatorById } from "./get-by-id";
import { getOperatorByUsername } from "./get-by-username";
import { createOperator } from "./create";
import { updateOperator } from "./update";

export async function operatorRoutes(app: FastifyTypedInstance) {
  app.register(getOperators);
  app.register(getOperatorById);
  app.register(getOperatorByUsername);
  app.register(createOperator);
  app.register(updateOperator);
}
