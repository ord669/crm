import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { userService } from "../services/user.service";

export const userRouter = createTRPCRouter({
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
});
