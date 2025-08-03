import { FastifyReply, FastifyRequest } from "fastify";

export async function CheckIsAdmin(
  request: FastifyRequest,
  reply: FastifyReply
) {
  request?.user?.type === "ADMIN"
    ? true
    : reply.status(403).send({ error: "Access denied: Admins only" });
}
