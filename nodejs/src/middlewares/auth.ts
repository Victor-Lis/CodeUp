// No seu back-end Fastify
import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken"; // Use a biblioteca padrão 'jsonwebtoken'

type PayloadResponse = {
  user: {
    id: number;
    name: string;
    username: string;
    type: string;
  };
  iat: number;
  exp: number;
};

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return reply
        .status(401)
        .send({ error: "Token de autorização ausente ou mal formatado" });
    }

    const token = authHeader.substring(7);

    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as PayloadResponse;

    request.user = payload.user;
  } catch (error) {
    console.error("❌ Erro na validação do token da API:", error);
    return reply.status(401).send({ error: "Token inválido ou expirado" });
  }
}
