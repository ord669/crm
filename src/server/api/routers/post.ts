import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { postService } from "../services/post.service";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ postTxt: z.string().min(1) }))
    .mutation(async ({ input }) => {
      return await postService.create(input.postTxt);
    }),

  getAll: publicProcedure.query(async () => {
    return await postService.getAll();
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      // Call the standalone function with the provided ID
      return await postService.getById(input.id);
    }),

  removeById: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      // Call the standalone function with the provided ID
      return await postService.deleteById(input.id);
    }),
});
