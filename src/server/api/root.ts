import { transactionsRouter } from "~/server/api/routers/transaction";
import { createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  transaction: transactionsRouter,
});

export type AppRouter = typeof appRouter;
