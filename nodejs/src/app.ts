import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import fastify from "fastify";

import "@/lib/firebase";

import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { SwaggerTheme, SwaggerThemeNameEnum } from "swagger-themes";

import { env } from "@/config/env";

import { userRoutes } from "./routes/user";
import { authenticate } from "./middlewares/auth";
import { authRoutes } from "./routes/auth";
import { errorHandler } from "./errors/error-handler";
import { SeedService } from "./services/seed";
import { guestRoutes } from "./routes/_guest";

export const app = fastify();

const theme = new SwaggerTheme();
const content = theme.getBuffer(SwaggerThemeNameEnum.DARK); // Dark mode for Swagger UI

app.register(cors, {
  origin: [process.env.ORIGIN as string],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  // credentials: true,
});

app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "CodeUp API",
      description: "API do sistema CodeUp do www.linkedin.com/in/victor-lis-bronzo.",
      version: "1.0.0",
    },
    securityDefinitions: {
      bearerAuth: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
        description:
          "Enter the token with the `Bearer: ` prefix, e.g., `Bearer abcde12345`",
      },
    },
    security: [
      {
        bearerAuth: [], // Aplica a autenticação globalmente, se desejar
      },
    ],
  },
  transform: jsonSchemaTransform,
});

app.setErrorHandler(errorHandler);

app.register(fastifySwaggerUI, {
  routePrefix: "/docs",
  theme: {
    css: [{ filename: "theme.css", content: content }],
  },
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.addHook("onRequest", async (request) => {
  const clientOrigin =
    request.headers.origin ||
    request.headers.referer ||
    request.headers["user-agent"] ||
    "Unknown";
  console.log(`[ ${request.method} ] ${request.url} | Client: ${clientOrigin}`);
});

app.register(authRoutes, { prefix: "/auth" });
app.register(guestRoutes);

app.register((app) => {
  app.addHook("preHandler", authenticate);

  app.register(userRoutes, { prefix: "/users" });
});

app.listen({ port: env.PORT, host: "0.0.0.0" }).then(() => {
  SeedService.createAdmin();
  console.log("Server running on port " + env.PORT);
});
