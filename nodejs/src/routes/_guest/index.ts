import { FastifyTypedInstance } from "@/types/fastify";
import { getRunById } from "../run/get-by-id";

export async function guestRoutes(app: FastifyTypedInstance) {
  // app.register(getItemById);
  app.register(getRunById, { prefix: "/run" });
}
