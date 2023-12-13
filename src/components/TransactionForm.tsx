import { api } from "~/utils/api";
import { SubmitHandler, useForm } from "react-hook-form";

type CreateTransactionData = {
    title: string;
    amount: number;
    description: string;
    fromAccount: string;
    toAccount: string;
  }
  
  type TransactionFormProps = {
    setCreating: (creating: boolean) => void;
    refetch: () => void;
  };

export default function TransactionForm(props: TransactionFormProps) {
    const createTransaction = api.transaction.create.useMutation();
    
    const { register, handleSubmit } = useForm<CreateTransactionData>({
      defaultValues: {
        title: '',
        amount: 0,
        description: '',
        fromAccount: '',
        toAccount: ''
      }
    });
  
    const onSubmit: SubmitHandler<CreateTransactionData> = (data: CreateTransactionData) => {
      createTransaction.mutate(data, {
        onSuccess: () => {
          props.refetch();
          props.setCreating(false);
        }
      });
    };
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-1">
        <label htmlFor="title">Title</label>
        <input 
          className="bg-transparent border-b border-slate-400" 
          type="text" 
          id="title"
          {...register('title')}
        />
  
        <label htmlFor="amount">Amount</label>
        <input 
          className="bg-transparent border-b border-slate-400" 
          type="number" 
          id="amount"
          {...register('amount', { valueAsNumber: true })}
        />
  
        <label htmlFor="description">Description</label>
        <input 
          className="bg-transparent border-b border-slate-400" 
          type="text" 
          id="description"
          {...register('description')}
        />
  
        <label htmlFor="fromAccount">From Account</label>
        <input 
          className="bg-transparent border-b border-slate-400" 
          type="text" 
          id="fromAccount"
          {...register('fromAccount')}
        />
  
        <label htmlFor="toAccount">To Account</label>
        <input 
          className="bg-transparent border-b border-slate-400" 
          type="text" 
          id="toAccount"
          {...register('toAccount')}
        />
  
        <button type="submit" className="bg-green-700 col-span-2">Submit</button>
      </form>
    )
  }