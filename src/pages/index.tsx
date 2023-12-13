import Head from "next/head";
import React, { useState } from "react";
import { api } from "~/utils/api";
import TransactionForm from "~/components/TransactionForm";
import TransactionRow from "~/components/TransactionRow";

export default function Home() {
  const { data, refetch } = api.transaction.getAll.useQuery();

  const [ creating, setCreating ] = useState(false);

  return (
    <>
      <Head>
        <title>Heard</title>
      </Head>
      <main className="flex h-screen w-full justify-center">
        <div className="h-full w-3/4 border-x border-slate-400">
          <div className="flex border-b border-slate-400 p-4 justify-center">
            Transaction List
          </div>
          <div className="flex flex-container justify-center">
            { creating ? (
              <TransactionForm
                setCreating={setCreating}
                refetch={refetch}
            />
            ) : (
              <button 
                type="button" 
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={() => setCreating(true)}
                >Create</button>
            )}
          </div>
          <div className="grid grid-cols-1 gap-4 border-t border-slate-400 justify-center">
            <TransactionRow
              id={"header"}
              title={"Title"} 
              description="Description"
              amount={"Amount"}
              fromAccount="From Account"
              toAccount="To Account"
              initialRowState="header"
              />
            { data?.map((transaction) => (
              <TransactionRow
                key={transaction.id} 
                id={transaction.id}
                title={transaction.title}
                description={transaction.description}
                amount={transaction.amount}
                fromAccount={transaction.fromAccount}
                toAccount={transaction.toAccount}
                refetch={refetch}
              />
            ))}
            </div>
          </div>
      </main>
    </>
  );
}