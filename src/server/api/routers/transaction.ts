import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const transactionsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.transaction.findMany();
  }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        amount: z.number(),
        description: z.string(),
        fromAccount: z.string(),
        toAccount: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.transaction.create({
        data: {
          ...input,
          transactionDate: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        }
      })
    }),
    update: publicProcedure
      .input(
        z.object({
          id: z.string(),
          title: z.string(),
          amount: z.number(),
          description: z.string(),
          fromAccount: z.string(),
          toAccount: z.string(),
        })
      )
      .mutation(({ ctx, input }) => {
        return ctx.db.transaction.update({
          where: {
            id: input.id,
          },
          data: {
            ...input,
          }
        })
      }),
    accountTotals: publicProcedure
      .query(async ({ ctx }) => {
        const transactions = await ctx.db.transaction.findMany();
        const totals = {}
        transactions.forEach(trans => {
          const toAccount = trans.toAccount;
          const fromAccount = trans.fromAccount;

          console.log(trans)
          if (totals[toAccount]) {
            totals[toAccount] = { balance: totals[toAccount].balance + trans.amount }
          } else {
            totals[toAccount] = {balance: trans.amount };
          } 

          if (totals[fromAccount]) {
            totals[fromAccount] = { balance: totals[fromAccount].balance - trans.amount }
          } else {
            totals[fromAccount] = { balance: trans.amount * -1 }
          }
        })
        console.log(totals);
        return totals;
      }),
    delete: publicProcedure
      .input(
        z.object({id: z.string()})
      )
      .mutation(({ctx, input}) => {
        return ctx.db.transaction.delete({
          where: {
            id: input.id,
          }
        })
      })
});


