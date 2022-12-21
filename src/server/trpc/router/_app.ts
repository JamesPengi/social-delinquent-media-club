import { router } from "../trpc";
import { mediaRouter } from "./media";

export const appRouter = router({
  media: mediaRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
