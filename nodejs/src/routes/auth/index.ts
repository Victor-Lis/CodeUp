import { FastifyTypedInstance } from "@/types/fastify";
import { signIn } from "./sign-in";
import { signOut } from "./sign-out";
import { verifyPassword } from "./verify-password";

export async function authRoutes(app: FastifyTypedInstance) {
  app.register(signIn);
  app.register(signOut);
  app.register(verifyPassword);
}
