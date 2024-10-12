'use client'
import { createContext, FC, ReactNode, useContext, useState } from "react";


// !Interfaces
// !Input State
interface ITripContextInputState {

}
// !Input State

// !Local State
interface ITripContextLocalState {
    allTrips: [],
    newTrips: [],
    selectedTrip: Trip | null,
}
// !Local State

interface ITripContextState {
    inputs: ITripContextInputState,
    local: ITripContextLocalState,
    fetch: {},
}

// !Individuals
interface Trip {

}
// !Individuals


interface ITripContext {
    state: ITripContextState,
    handlers: {
        setInputState: ({ key, value }: { key: keyof ITripContextInputState, value: any }) => void,
        setLocalState: ({ key, value }: { key: keyof ITripContextLocalState, value: any }) => void,
        setFetchState: ({ key, value }: { key: keyof ITripContextInputState, value: any }) => void,
    }
}

const TripContext = createContext<ITripContext | undefined>(undefined)

function TripContextProvider({ children }: { children: ReactNode }) {
    const [state, updateState] = useState<ITripContextState>({
        fetch: {

        },
        inputs: {

        },
        local: {
            allTrips: [],
            newTrips: [],
            selectedTrip: null
        }
    })

    const setFetchState = () => { }
    const setInputState = () => { }
    const setLocalState = () => { }

    return (
        <TripContext.Provider value={{
            state,
            handlers: {
                setFetchState,
                setInputState,
                setLocalState
            },
        }}>
            {children}
        </TripContext.Provider>
    )
}

export default TripContextProvider;


export const useTripContext = () => {

    const context = useContext(TripContext);

    if (!context) {
        throw new Error('TripContextProvider must wrap a base Container!')
    }
    else return context;
}