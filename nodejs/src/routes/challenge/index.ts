import { FastifyTypedInstance } from "@/types/fastify";
import { createChallenge } from "./create";
import { updateChallenge } from "./update";
import { getChallenges } from "./get-all";

export async function challengeRoutes(app: FastifyTypedInstance) {
  app.register(createChallenge);
  app.register(updateChallenge);
  app.register(getChallenges);
}
