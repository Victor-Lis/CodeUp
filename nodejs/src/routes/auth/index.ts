import { FastifyTypedInstance } from "@/types/fastify";
import { signIn } from "./sign-in";
import { signOut } from "./sign-out";
import { verifyPassword } from "./verify-password";
import { signUp } from "./sign-up";

export async function authRoutes(app: FastifyTypedInstance) {
  app.register(signIn);
  app.register(signUp);
  app.register(signOut);
  app.register(verifyPassword);
}
