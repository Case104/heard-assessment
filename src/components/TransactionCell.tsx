import { Controller, FieldValues, Control } from "react-hook-form";
import { TransactionRowProps } from "./TransactionRow";

type TransactionCellProps = {
    rowState: string;
    name: keyof TransactionRowProps;
    control: Control<FieldValues>;
    watch: (name: string) => any;
  };
  
  export default function TransactionCell({ rowState, name, control, watch }: TransactionCellProps) { 
    const currentValue = watch(name);
    const inputType = name === 'amount' ? 'number' : 'text';
  
    return (
      <div>
        {rowState === "editing" && (
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <input
                className="bg-transparent"
                type={inputType}
                {...field}
              />
            )}
          />
        )}
        {rowState !== "editing" && (
           <div>{currentValue}</div> 
        )}
      </div>
  
    )
  }
  