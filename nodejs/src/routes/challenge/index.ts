import { FastifyTypedInstance } from "@/types/fastify";
import { createChallenge } from "./create";
import { updateChallenge } from "./update";
import { getChallenges } from "./get-all";
import { deleteChallenge } from "./delete";
import { CheckIsAdmin } from "@/middlewares/check-is-admin";

export async function challengeRoutes(app: FastifyTypedInstance) {
  app.register(getChallenges);

  app.register((mutationsApp) => {
    mutationsApp.addHook("preHandler", CheckIsAdmin);
    mutationsApp.register(createChallenge);
    mutationsApp.register(updateChallenge);
    mutationsApp.register(deleteChallenge);
  });
}
