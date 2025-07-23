import { z } from "zod";

export const PaginationParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  pageSize: z.coerce.number().optional().default(10),
});

export type PaginationParamsType = z.infer<typeof PaginationParamsSchema>;

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    items: z.array(schema),
    totalItems: z.number(),
    page: z.number(),
    pageSize: z.number(),
    totalPages: z.number(),
  });

export type PaginatedResponseType<T extends z.ZodTypeAny> = z.infer<
  ReturnType<typeof PaginatedResponseSchema<T>>
>;
