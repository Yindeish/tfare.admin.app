'use client'
import { createContext, FC, ReactNode, useContext, useState } from "react";


// !Interfaces
// !Input State
interface ITicketContextInputState {

}
// !Input State

// !Local State
interface ITicketContextLocalState {
    allTickets: [],
    newTickets: [],
    selectedTicket: Ticket | null,
}
// !Local State

interface ITicketContextState {
    inputs: ITicketContextInputState,
    local: ITicketContextLocalState,
    fetch: {},
}

// !Individuals
interface Ticket {

}
// !Individuals


interface ITicketContext {
    state: ITicketContextState,
    handlers: {
        setInputState: ({ key, value }: { key: keyof ITicketContextInputState, value: any }) => void,
        setLocalState: ({ key, value }: { key: keyof ITicketContextLocalState, value: any }) => void,
        setFetchState: ({ key, value }: { key: keyof ITicketContextInputState, value: any }) => void,
    }
}

const TicketContext = createContext<ITicketContext | undefined>(undefined)

function TicketContextProvider({ children }: { children: ReactNode }) {
    const [state, updateState] = useState<ITicketContextState>({
        fetch: {

        },
        inputs: {

        },
        local: {
            allTickets: [],
            newTickets: [],
            selectedTicket: null
        }
    })

    const setFetchState = () => { }
    const setInputState = () => { }
    const setLocalState = () => { }

    return (
        <TicketContext.Provider value={{
            state,
            handlers: {
                setFetchState,
                setInputState,
                setLocalState
            },
        }}>
            {children}
        </TicketContext.Provider>
    )
}

export default TicketContextProvider;


export const useTicketContext = () => {

    const context = useContext(TicketContext);

    if (!context) {
        throw new Error('TicketContextProvider must wrap a base Container!')
    }
    else return context;
}