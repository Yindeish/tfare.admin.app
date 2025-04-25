'use client'
import { createContext, FC, ReactNode, useContext, useState } from "react";

// !Fetch State
interface IDashboardContextFetchState { 
    fetchingEarnings: boolean,
    fetchingRides: boolean,
    fetchingTickets: boolean,
    fetchingTrips: boolean,
}
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
        setFetchState: ({ key, value }: { key: keyof IDashboardContextFetchState, value: number | null | boolean }) => void,
    }
}

const HomeContext = createContext<IHomeContext | undefined>(undefined)

function HomeContextProvider({ children }: { children: ReactNode }) {
    const [state, updateState] = useState<IHomeContextState>({
        fetch: {
            fetchingEarnings: false,
            fetchingRides: false,
            fetchingTickets: false,
            fetchingTrips: false,
        },

        local: {
            activeRides: 0,
            activeTrips: 0,
            pendingTickets: 0,
            totalEarnings: 0
        }
    })

    const setFetchState = ({ key, value }: { key: keyof IDashboardContextFetchState; value: number | null | boolean; }) => {
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