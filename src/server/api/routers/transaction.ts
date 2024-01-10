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
          amount,
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
          amount: z.string(),
          description: z.string(),
          fromAccount: z.string(),
          toAccount: z.string(),
        })
      )
      .mutation(({ ctx, input }) => {
        const amount = Number(input.amount);
        console.log(amount)

        return ctx.db.transaction.update({
          where: {
            id: input.id,
          },
          data: {
            ...input,
            amount,
          }
        })
      }),
    accountTotals: publicProcedure
      .query( async ({ ctx }) => {
        const transactions = ctx.db.transaction.findMany({
          where: {
            fromAccount: {
              not: null,
            },
            toAccount: {
              not: null,
            }
          }
        });
        const totals = {}
        await transactions.forEach(trans => {
          const toAccount = trans.toAccount;
          const fromAccount = trans.fromAccount;


          if (totals[toAccount]) {
            totals[toAccount] = totals[toAccount] + trans.amount
          } else {
            totals[toAccount] = trans.amount;
          } 

          if (totals[fromAccount]) {
            totals[fromAccount] = totals[fromAccount] - trans.amount
          } else {
            totals[fromAccount] = trans.amount * -1;
          }
        })

        Object.entries(totals).forEach(([key, value]) => {
          totals[key] = {balance: value}
        })
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


