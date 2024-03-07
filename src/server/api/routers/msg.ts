import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { userService } from "../services/user.service";
import { msgService } from "../services/msg.service";

export const msgsRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        id: z.string(),
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        email: z.string().optional().nullable().or(z.literal(null)),
      }),
    )
    .mutation(async ({ input }) => {
      // Destructure the input to pass to the userService.create function
      const { id, firstName, lastName, email } = input;
      // Call the create function with the validated and parsed input
      return await userService.create(id, firstName, lastName, email ?? null);
    }),

  getMsgsById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      // Call the standalone function with the provided ID
      return await msgService.getMessagesByContactId(input.id);
    }),

  getAll: publicProcedure.query(async () => {
    return await msgService.getAll();
  }),
});
