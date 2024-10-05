'use client'
import { createContext, FC, ReactNode, useContext, useState } from "react";

// !Fetch State
interface IDashboardContextFetchState { }
// !Fetch State

// !Local State
interface IDashboardContextLocalState {
    activeRides: number | null,
    activeTrips: number | null,
    pendingTickets: number | null,
    totalEarnings: number | null,
}
// !Local State

interface IHomeContextState {
    local: IDashboardContextLocalState,
    fetch: IDashboardContextFetchState,
}

interface IHomeContext {
    state: IHomeContextState,
    handlers: {
        setLocalState: ({ key, value }: { key: keyof IDashboardContextLocalState, value: number | null }) => void,
        setFetchState: ({ key, value }: { key: keyof IDashboardContextFetchState, value: number | null }) => void,
    }
}

const HomeContext = createContext<IHomeContext | undefined>(undefined)

function HomeContextProvider({ children }: { children: ReactNode }) {
    const [state, updateState] = useState<IHomeContextState>({
        fetch: {

        },

        local: {
            activeRides: null,
            activeTrips: null,
            pendingTickets: null,
            totalEarnings: null
        }
    })

    const setFetchState = ({ key, value }: { key: keyof IDashboardContextFetchState; value: number | null; }) => {
        updateState((prev) => ({
            ...prev,
            fetch: {
                ...prev.fetch,
                [key]: value
            }
        }))
    }

    const setLocalState = ({ key, value }: { key: keyof IDashboardContextLocalState; value: number | null; }) => {
        updateState((prev) => ({
            ...prev,
            local: {
                ...prev.local,
                [key]: value
            }
        }))
    }

    return (
        <HomeContext.Provider value={{
            state,
            handlers: {
                setFetchState,
                setLocalState
            },
        }}>
            {children}
        </HomeContext.Provider>
    )
}

export default HomeContextProvider;


export const useHomeContext = () => {

    const context = useContext(HomeContext);

    if (!context) {
        throw new Error('HomeContextProvider must wrap a base Container!')
    }
    else return context;
}