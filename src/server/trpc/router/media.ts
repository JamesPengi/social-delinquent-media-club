import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const mediaRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.media.findMany();
  }),
});
