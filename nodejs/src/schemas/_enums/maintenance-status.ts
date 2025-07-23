import { z } from "zod";

export const MaintenanceStatusEnum = z.enum([
  "IN_STOCK",
  "IN_USE",
  "IN_REPAIR",
  "OUT_OF_SERVICE",
  "SOLD",
  "BROKEN",
]);