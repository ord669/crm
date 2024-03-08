import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { templateService } from "../services/template.service";

export const templateRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return await templateService.getAll();
  }),
});
