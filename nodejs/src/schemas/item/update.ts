import { z } from "zod";
import { MaintenanceStatusEnum } from "../_enums/maintenance-status";

export const UpdateItemSchema = z.object({
  observation: z.string().nullable().optional(),
  osCode: z.string().nullable().optional(),
  isUsed: z.boolean().optional(),
  maintenanceStatus: MaintenanceStatusEnum,

  itemModelId: z.number().optional(),
  stockId: z.number().optional(),
  technicianId: z.number().nullable().optional(),
  itemLocationId: z.number().nullable().optional(),
});

export type UpdateItemType = z.infer<typeof UpdateItemSchema>;
