import { z } from "zod";
import { ItemModelSchema } from "../item-model";
import { MaintenanceStatusEnum } from "../_enums/maintenance-status";
import { TechnicianSchema } from "../technician";
import { ItemLocationSchema } from "../item-location";
import { StockSchema } from "../stock";

export const ItemSchema = z.object({
  id: z.number(),
  code: z.number(),
  observation: z.string().nullable(),
  osCode: z.string().nullable(),
  isUsed: z.boolean(),
  maintenanceStatus: MaintenanceStatusEnum,
  createdAt: z.date(),
  updatedAt: z.date(),

  itemModelId: z.number(),
  stockId: z.number(),
  technicianId: z.number().nullable(),
  itemLocationId: z.number().nullable(),

  stock: StockSchema.optional().nullable(),
  itemModel: ItemModelSchema.optional(),
  technician: TechnicianSchema.optional().nullable(),
  itemLocation: ItemLocationSchema.optional().nullable(),
});

export const getItemByCategoryIdSchema = z.object({
  id: z.number(),
  code: z.number(),
  observation: z.string().nullable(),
  osCode: z.string().nullable(),
  isUsed: z.boolean(),
  maintenanceStatus: MaintenanceStatusEnum,
  createdAt: z.date(),
  updatedAt: z.date(),

  itemModel: ItemModelSchema,
});

export const getPaginatedItemsSchema = z.object({
  items: z.array(ItemSchema),
  totalItems: z.number(),
  page: z.number(),
  pageSize: z.number(),
  totalPages: z.number(),
});

export type ItemType = z.infer<typeof ItemSchema>;
export type GetItemByCategoryIdType = z.infer<typeof getItemByCategoryIdSchema>;
