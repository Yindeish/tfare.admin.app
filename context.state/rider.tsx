'use client'
import { createContext, FC, ReactNode, useContext, useState } from "react";


// !Interfaces
// !Input State
interface IRidersContextInputState {

}
// !Input State

// !Local State
interface IRidersContextLocalState {
    allRiders: [],
    newRiders: [],
    selectedRider: Rider | null,
}
// !Local State

interface IRiderContextState {
    inputs: IRidersContextInputState,
    local: IRidersContextLocalState,
    fetch: {},
}

// !Individuals
interface Rider {

}
// !Individuals


interface IRiderContext {
    state: IRiderContextState,
    handlers: {
        setInputState: ({ key, value }: { key: keyof IRidersContextInputState, value: any }) => void,
        setLocalState: ({ key, value }: { key: keyof IRidersContextLocalState, value: any }) => void,
        setFetchState: ({ key, value }: { key: keyof IRidersContextInputState, value: any }) => void,
    }
}

const RiderContext = createContext<IRiderContext | undefined>(undefined)

function RiderContextProvider({ children }: { children: ReactNode }) {
    const [state, updateState] = useState<IRiderContextState>({
        fetch: {

        },
        inputs: {

        },
        local: {
            allRiders: [],
            newRiders: [],
            selectedRider: null
        }
    })

    const setFetchState = () => { }
    const setInputState = () => { }
    const setLocalState = () => { }

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