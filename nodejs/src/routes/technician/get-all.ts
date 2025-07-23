import { PaginatedResponseSchema, PaginationParamsSchema } from "@/schemas/_global/pagination";
import { TechnicianSchema } from "@/schemas/technician";
import { TechnicianService } from "@/services/technician";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export function getTechnicians(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/",
    {
      schema: {
        summary: "Retrieve all technicians",
        tags: ["Technician"],
        querystring: PaginationParamsSchema,
        response: {
          200: PaginatedResponseSchema(TechnicianSchema),
        },
      },
    },
    async (request, reply) => {
      const pagination = {
        page: request.query.page,
        pageSize: request.query.pageSize,
      };
      const technicians = await TechnicianService.getTechnicians(pagination);
      reply.status(200).send(technicians);
    }
  );
}
