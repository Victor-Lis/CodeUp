import { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { NotFound } from "./not-found";
import { InvalidCredentials } from "./invalid-credentials";
import {
  hasZodFastifySchemaValidationErrors,
  isResponseSerializationError,
} from "fastify-type-provider-zod";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  console.error("Erro capturado:", error);
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Invalid Input",
      errors: error.flatten().fieldErrors,
      details: {
        issues: error.validation,
        method: request.method,
        url: request.url,
      },
    });
  }

  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.code(400).send({
      error: "Response Validation Error",
      message: "Request doesn't match the schema",
      details: {
        issues: error.validation,
        method: request.method,
        url: request.url,
      },
    });
  }

  if (isResponseSerializationError(error)) {
    return reply.code(500).send({
      error: "Internal Server Error",
      message: "Response doesn't match the schema",
      details: {
        issues: error.validation,
        method: request.method,
        url: request.url,
      },
    });
  }

  if (error instanceof NotFound) {
    return reply.status(400).send({
      message: error.message,
      details: {
        issues: error.validation,
        method: request.method,
        url: request.url,
      },
    });
  }

  if (error instanceof InvalidCredentials) {
    return reply.status(401).send({
      message: error.message,
      details: {
        issues: error.validation,
        method: request.method,
        url: request.url,
      },
    });
  }

  return reply.status(500).send({
    message: "Internal Server Error",
    details: {
      issues: error.validation,
      method: request.method,
      url: request.url,
    },
  });
};
