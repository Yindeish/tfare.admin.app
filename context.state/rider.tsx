'use client'
import { createContext, FC, ReactNode, useContext, useState } from "react";


// !Interfaces
// !Input State
interface IDashboardContextSharedInputState {

}

interface IDashboardContextRidersInputState {

}
// !Input State

// !Local State
interface IDashboardContextRidersLocalState {
    allRiders: [],
    newRiders: [],
    selectedRider: Rider | null,
}
// !Local State

interface IRiderContextState {
    inputs: IDashboardContextRidersInputState,
    local: IDashboardContextRidersLocalState,
    fetch: {},
}

// !Individuals
interface Rider {

}

interface IRiderContext {
    state: IRiderContextState,
    handlers: {
        setInputState: ({ }: { key: keyof IDashboardContextRidersInputState, value: any }) => void,
        setLocalState: ({ }: { key: keyof IDashboardContextRidersLocalState, value: any }) => void,
        setFetchState: ({ }: { key: keyof IDashboardContextRidersInputState, value: any }) => void,
    }
}

const RiderContext = createContext<IRiderContext | undefined>(undefined)

function RiderContextProvider({ children }: { children: ReactNode }) {
    const [state, updateState] = useState<IRiderContextState>({
        fetch: {

        },
        inputs: {},
        local: {
            allRiders: [],
            newRiders: [],
            selectedRider: null
        }
    })

    return (
        <RiderContext.Provider value={{
            state,
            handlers: {
                setFetchState,
                setInputState,
                setLocalState
            },
        }}>
            {children}
        </RiderContext.Provider>
    )
}

export default RiderContextProvider;


export const useRiderContext = () => {

    const context = useContext(RiderContext);

    if (!context) {
        throw new Error('RiderContextProvider must wrap a base Container!')
    }
    else return context;
}