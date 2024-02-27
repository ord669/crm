import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { msgService } from "../services/msg.service";
import { contactService } from "../services/contact.service";

export const contactRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      // Call the standalone function with the provided ID
      return await contactService.getById(input.id);
    }),

  getAll: publicProcedure.query(async () => {
    return await contactService.getAll();
  }),
});
