import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { cronService } from "../services/cron.service";

export const cronRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(
      z.object({
        hours: z.string(),
        minutes: z.string(),
        template: z.string(),
        contactId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return await cronService.create(
        input.hours,
        input.minutes,
        input.template,
        input.contactId,
      );
    }),

  getAll: publicProcedure.query(async () => {
    return await cronService.getAll();
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      // Call the standalone function with the provided ID
      return await cronService.getById(input.id);
    }),

  removeById: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      // Call the standalone function with the provided ID
      return await cronService.deleteById(input.id);
    }),
});
