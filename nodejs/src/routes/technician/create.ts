import { CreateTechnicianSchema } from "@/schemas/technician/create";

import { TechnicianService } from "@/services/technician";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function createTechnician(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/",
    {
      schema: {
        summary: "Create a new technician",
        tags: ["Technician"],
        body: CreateTechnicianSchema,
        response: {
          201: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name } = request.body;
      await TechnicianService.createTechnician({
        name,
      });
      reply.status(201).send({
        message: "Technician created successfully",
      });
    }
  );
}
