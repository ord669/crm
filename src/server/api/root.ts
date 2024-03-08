import { postRouter } from "@/server/api/routers/post";
import { createTRPCRouter } from "@/server/api/trpc";
import { contactRouter } from "./routers/contact";
import { msgsRouter } from "./routers/msg";
import { templateRouter } from "./routers/template";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  msg: msgsRouter,
  contact: contactRouter,
  template: templateRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
