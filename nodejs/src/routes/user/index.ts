import { FastifyTypedInstance } from "@/types/fastify";
import { getUsers } from "./get-all";
import { getUserById } from "./get-by-id";
import { getUserByUsername } from "./get-by-username";
import { createUser } from "./create";
import { updateUser } from "./update";

export async function userRoutes(app: FastifyTypedInstance) {
  app.register(getUsers);
  app.register(getUserById);
  app.register(getUserByUsername);
  app.register(createUser);
  app.register(updateUser);
}
