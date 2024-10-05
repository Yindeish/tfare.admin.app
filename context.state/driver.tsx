'use client'
import { createContext, FC, ReactNode, useContext, useState } from "react";


// !Interfaces
// !Input State
interface IDriversContextInputState {

}
// !Input State

// !Local State
interface IDriversContextLocalState {
    allDrivers: [],
    newDrivers: [],
    selectedDriver: Driver | null,
}
// !Local State

interface IDriverContextState {
    inputs: IDriversContextInputState,
    local: IDriversContextLocalState,
    fetch: {},
}

// !Individuals
interface Driver {

}
// !Individuals


interface IDriverContext {
    state: IDriverContextState,
    handlers: {
        setInputState: ({ key, value }: { key: keyof IDriversContextInputState, value: any }) => void,
        setLocalState: ({ key, value }: { key: keyof IDriversContextLocalState, value: any }) => void,
        setFetchState: ({ key, value }: { key: keyof IDriversContextInputState, value: any }) => void,
    }
}

const DriverContext = createContext<IDriverContext | undefined>(undefined)

function DriverContextProvider({ children }: { children: ReactNode }) {
    const [state, updateState] = useState<IDriverContextState>({
        fetch: {

        },
        inputs: {

        },
        local: {
            allDrivers: [],
            newDrivers: [],
            selectedDriver: null
        }
    })

    const setFetchState = () => { }
    const setInputState = () => { }
    const setLocalState = () => { }

    return (
        <DriverContext.Provider value={{
            state,
            handlers: {
                setFetchState,
                setInputState,
                setLocalState
            },
        }}>
            {children}
        </DriverContext.Provider>
    )
}

export default DriverContextProvider;


export const useDriverContext = () => {

    const context = useContext(DriverContext);

    if (!context) {
        throw new Error('DriverContextProvider must wrap a base Container!')
    }
    else return context;
}