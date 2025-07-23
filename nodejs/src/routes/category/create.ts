import { CreateCategorySchema } from "@/schemas/category/create";
import { AuthService } from "@/services/auth";

import { CategoryService } from "@/services/category";
import { FastifyTypedInstance } from "@/types/fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function createCategory(app: FastifyTypedInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/",
    {
      schema: {
        summary: "Create a new category",
        tags: ["Category"],
        body: CreateCategorySchema,
        response: {
          201: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, prefix, column, color } = request.body;
      await CategoryService.createCategory({
        name,
        prefix,
        column,
        color,
      });
      reply.status(201).send({
        message: "Category created successfully",
      });
    }
  );
}
