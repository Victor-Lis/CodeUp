import { TechnicianSchema } from "@/schemas/technician";

import { TechnicianService } from "@/services/technician";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function getTechnicianById(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/:id",
    {
      schema: {
        summary: "Retrieve a technician",
        tags: ["Technician"],
        params: z.object({
          id: z.coerce.number(),
        }),
        response: {
          200: TechnicianSchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const technician = await TechnicianService.getTechnicianById(id);
      reply.status(200).send(technician);
    }
  );
}
