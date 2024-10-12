'use client'
import { createContext, FC, ReactNode, useContext, useState } from "react";


// !Interfaces
// !Input State
interface IRideContextInputState {

}
// !Input State

// !Local State
interface IRideContextLocalState {
    allRides: [],
    newRides: [],
    selectedRide: Ride | null,
}
// !Local State

interface IRideContextState {
    inputs: IRideContextInputState,
    local: IRideContextLocalState,
    fetch: {},
}

// !Individuals
interface Ride {

}
// !Individuals


interface IRideContext {
    state: IRideContextState,
    handlers: {
        setInputState: ({ key, value }: { key: keyof IRideContextInputState, value: any }) => void,
        setLocalState: ({ key, value }: { key: keyof IRideContextLocalState, value: any }) => void,
        setFetchState: ({ key, value }: { key: keyof IRideContextInputState, value: any }) => void,
    }
}

const RideContext = createContext<IRideContext | undefined>(undefined)

function RideContextProvider({ children }: { children: ReactNode }) {
    const [state, updateState] = useState<IRideContextState>({
        fetch: {

        },
        inputs: {

        },
        local: {
            allRides: [],
            newRides: [],
            selectedRide: null
        }
    })

    const setFetchState = () => { }
    const setInputState = () => { }
    const setLocalState = () => { }

    return (
        <RideContext.Provider value={{
            state,
            handlers: {
                setFetchState,
                setInputState,
                setLocalState
            },
        }}>
            {children}
        </RideContext.Provider>
    )
}

export default RideContextProvider;


export const useRideContext = () => {

    const context = useContext(RideContext);

    if (!context) {
        throw new Error('RideContextProvider must wrap a base Container!')
    }
    else return context;
}