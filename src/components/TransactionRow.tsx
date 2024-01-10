import { api } from "~/utils/api";
import { useForm } from "react-hook-form";
import { useState } from "react";
import TransactionCell from "./TransactionCell";

export type TransactionRowProps = {
    id: string;
    title: string;
    amount: number;
    description: string;
    fromAccount: string;
    toAccount: string;
    refetch?: () => void;
    initialRowState?: string;
  };
  
  export default function TransactionRow(props: TransactionRowProps) {
    const {id, refetch, initialRowState, ...defaultValues} = props;
    const {control, handleSubmit, reset, watch } = useForm({
      defaultValues
    });
  
    const editTransaction = api.transaction.update.useMutation();
    const deleteTransaction = api.transaction.delete.useMutation();
  
    const [rowState, setRowState] = useState(initialRowState ?? 'viewing');
  
    const onSubmit = (data: typeof defaultValues) => {
      editTransaction.mutate({ id, ...data, amount: Number(data.amount) }, {
        onSuccess: () => {
          setRowState('viewing');    }
      });
    }
    
    const handleDelete = () => {
      deleteTransaction.mutate({ id: props.id }, {
        onSuccess: () => {
          refetch();
        }
      });
    }
  
    const handleReset = () => {
      reset();
      setRowState('viewing');
    }
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-6 col-span-6">
        {Object.keys(defaultValues).map(key => (
          <TransactionCell
            key={key}
            rowState={rowState}
            name={key as keyof typeof defaultValues}
            control={control}
            watch={watch}
          />
        ))}
        <div className="flex col-span-1">
          {rowState === 'editing' && (
            <>
              <button 
                type="submit" 
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >Save</button>
              <button 
                type="button" 
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={handleReset}
              >Reset</button>
            </>)}
          {rowState === 'viewing' && (
            <>
              <button 
                type="button" 
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => setRowState('editing')}>Edit</button>
              <button 
                type="button" 
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={handleDelete}>Delete</button>
            </>
          )}
        </div>
      </form>
    )
  }
