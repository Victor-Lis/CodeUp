import { TechnicianService } from "@/services/technician";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { UpdateTechnicianSchema } from "@/schemas/technician/update";
import { z } from "zod";

export function updateTechnician(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/:id",
    {
      schema: {
        summary: "Update a new technician",
        tags: ["Technician"],
        params: z.object({
          id: z.coerce.number(),
        }),
        body: UpdateTechnicianSchema,
        response: {
          204: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const { name, status } = request.body;
      await TechnicianService.updateTechnician(id, {
        name,
        status,
      });
      reply.status(204).send({
        message: "Technician  updated successfully",
      });
    }
  );
}
