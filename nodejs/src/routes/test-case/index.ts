import { FastifyTypedInstance } from "@/types/fastify";
import { createTestCase } from "./create";
import { updateTestCase } from "./update";
import { getTestCasesByChallengeId } from "./get-by-challenge";
import { deleteTestCase } from "./delete";
import { CheckIsAdmin } from "@/middlewares/check-is-admin";

export async function testCaseRoutes(app: FastifyTypedInstance) {
  app.register(getTestCasesByChallengeId);

  app.register((mutationsApp) => {
    mutationsApp.addHook("preHandler", CheckIsAdmin);
    mutationsApp.register(createTestCase);
    mutationsApp.register(updateTestCase);
    mutationsApp.register(deleteTestCase);
  });
}
