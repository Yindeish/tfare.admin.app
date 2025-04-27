"use client";
import { createContext, FC, ReactNode, useContext, useState } from "react";

// !Interfaces
// !Input State
interface ITransactionContextInputState {
  method: "user" | "driver";
  status: "ongoing" | "completed";
}
// !Input State

// !Local State
interface ITransactionContextLocalState {
  allTransactions: ITransaction[];
  newTransactions: ITransaction[];
  selectedTransaction: ITransaction | null;
}
// !Local State

// !Fetch State
export interface ITransactionContextFetchState {
  fetchingTransactions: boolean;
}

interface ITransactionContextState {
  inputs: ITransactionContextInputState;
  local: ITransactionContextLocalState;
  fetch: ITransactionContextFetchState;
}

// !Individuals
export type TTransactionStatus = 'successful' | 'failed';

export interface ITransaction {
    userId: string,
    event: string,
    data: {
      id: number,
      tx_ref: string,
      flw_ref: string,
      device_fingerprint: string,
      amount: number,
      currency: String,
      charged_amount: number,
      app_fee: number,
      merchant_fee: number,
      processor_response: string,
      auth_model: string,
      ip: string,
      narration: string,
      status: TTransactionStatus,
      payment_type: string,
      created_at: string,
      account_id: number,
      customer: {
        id: number,
        name: string,
        phone_number: string,
        email: string,
        created_at: string,
      },
    },
    meta_data: {
      originatorname: string,
      bankname: string,
      originatoramount: string,
      originatoraccountnumber: string,
    },
    eventType: string,
}
// !Individuals

interface ITransactionContext {
  state: ITransactionContextState;
  handlers: {
    setInputState: ({
      key,
      value,
    }: {
      key: keyof ITransactionContextInputState;
      value: any;
    }) => void;
    setLocalState: ({
      key,
      value,
    }: {
      key: keyof ITransactionContextLocalState;
      value: any;
    }) => void;
    setFetchState: ({
      key,
      value,
    }: {
      key: keyof ITransactionContextFetchState;
      value: any;
    }) => void;
  };
}

const TransactionContext = createContext<ITransactionContext | undefined>(
  undefined
);

function TransactionContextProvider({ children }: { children: ReactNode }) {
  const [state, updateState] = useState<ITransactionContextState>({
    fetch: {
      fetchingTransactions: false,
    },
    inputs: {
      method: "user",
      status: "ongoing",
    },
    local: {
      allTransactions: [],
      newTransactions: [],
      selectedTransaction: null,
    },
  });

   const setFetchState = ({
      key,
      value,
    }: {
      key: keyof ITransactionContextFetchState;
      value: any;
    }) => {
      updateState((prevState) => ({
        ...prevState,
        fetch: {
          ...prevState.fetch,
          [key]: value,
        },
      }));
    };
  
    const setInputState = ({
      key,
      value,
    }: {
      key: keyof ITransactionContextInputState;
      value: any;
    }) => {
      updateState((prevState) => ({
        ...prevState,
        inputs: {
          ...prevState.inputs,
          [key]: value,
        },
      }));
    };
  
    const setLocalState = ({
      key,
      value,
    }: {
      key: keyof ITransactionContextLocalState;
      value: any;
    }) => {
      updateState((prevState) => ({
        ...prevState,
        local: {
          ...prevState.local,
          [key]: value,
        },
      }));
    };

  return (
    <TransactionContext.Provider
      value={{
        state,
        handlers: {
          setFetchState,
          setInputState,
          setLocalState,
        },
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export default TransactionContextProvider;

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error("TransactionContextProvider must wrap a base Container!");
  } else return context;
};
