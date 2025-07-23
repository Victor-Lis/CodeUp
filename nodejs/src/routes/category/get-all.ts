import { CategorySchema } from "@/schemas/category";
import { CategoryService } from "@/services/category";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function getCategories(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/",
    {
      schema: {
        summary: "Retrieve all categories",
        tags: ["Category"],
        response: {
          200: z.array(CategorySchema),
        },
      },
    },
    async (request, reply) => {
      const categorys = await CategoryService.getCategories();
      reply.status(200).send(categorys);
    }
  );
}
