import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const mediaRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.media.findMany();
  }),
  newMedia: publicProcedure
    .input(
      z.object({
        mediaType: z.enum(["movie", "tv"]),
        name: z.string(),
        genre: z.enum([
          "Drama",
          "Comedy",
          "Horror",
          "Animated",
          "Action",
          "Adventure",
          "Sadge",
          "JapaneseAnimation",
        ]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.media.create({
        data: {
          name: input.name,
          genre: input.genre,
        },
      });
    }),
});
