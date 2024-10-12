'use client'
import { createContext, FC, ReactNode, useContext, useState } from "react";


// !Interfaces
// !Input State
interface ITransactionContextInputState {

}
// !Input State

// !Local State
interface ITransactionContextLocalState {
    allTransactions: [],
    newTransactions: [],
    selectedTransaction: Transaction | null,
}
// !Local State

interface ITransactionContextState {
    inputs: ITransactionContextInputState,
    local: ITransactionContextLocalState,
    fetch: {},
}

// !Individuals
interface Transaction {

}
// !Individuals


interface ITransactionContext {
    state: ITransactionContextState,
    handlers: {
        setInputState: ({ key, value }: { key: keyof ITransactionContextInputState, value: any }) => void,
        setLocalState: ({ key, value }: { key: keyof ITransactionContextLocalState, value: any }) => void,
        setFetchState: ({ key, value }: { key: keyof ITransactionContextInputState, value: any }) => void,
    }
}

const TransactionContext = createContext<ITransactionContext | undefined>(undefined)

function TransactionContextProvider({ children }: { children: ReactNode }) {
    const [state, updateState] = useState<ITransactionContextState>({
        fetch: {

        },
        inputs: {

        },
        local: {
            allTransactions: [],
            newTransactions: [],
            selectedTransaction: null
        }
    })

    const setFetchState = () => { }
    const setInputState = () => { }
    const setLocalState = () => { }

    return (
        <TransactionContext.Provider value={{
            state,
            handlers: {
                setFetchState,
                setInputState,
                setLocalState
            },
        }}>
            {children}
        </TransactionContext.Provider>
    )
}

export default TransactionContextProvider;


export const useTransactionContext = () => {

    const context = useContext(TransactionContext);

    if (!context) {
        throw new Error('TransactionContextProvider must wrap a base Container!')
    }
    else return context;
}