import { z } from "zod";
import { MaintenanceStatusEnum } from "../_enums/maintenance-status";

export const CreateItemSchema = z.object({
  observation: z.string().nullable().optional(),
  osCode: z.string().nullable().optional(),
  technicianId: z.number().nullable().optional(),
  itemLocationId: z.number().nullable().optional(),
  isUsed: z.boolean().default(false),
  maintenanceStatus: MaintenanceStatusEnum,
  itemModelId: z.number(),
  stockId: z.number(),
});

export type CreateItemType = z.infer<typeof CreateItemSchema>;
