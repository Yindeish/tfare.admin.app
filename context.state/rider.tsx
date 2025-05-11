'use client'
import { createContext, FC, ReactNode, useContext, useState } from "react";
import { IUser } from "./auth";


// !Interfaces
// !Input State
export interface IRidersContextInputState {
  userName: string,
  email: string,
  phoneNumber: string,
  walletBalance: string,
}
// !Input State

// !Local State
interface IRidersContextLocalState {
    allRiders: IUser[],
    newRiders: IUser[],
    selectedRider: IUser | null,
    riderOrders: [],
    riderTransactions: []
}
// !Local State

// !Fetch State
export interface IRidersContextFetchState {
    fetchingRiders: boolean;
}
// !Fetch State

interface IRiderContextState {
    inputs: IRidersContextInputState,
    local: IRidersContextLocalState,
    fetch: IRidersContextFetchState,
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
        setFetchState: ({ key, value }: { key: keyof IRidersContextFetchState, value: any }) => void,
    }
}

const RiderContext = createContext<IRiderContext | undefined>(undefined)

function RiderContextProvider({ children }: { children: ReactNode }) {
    const [state, updateState] = useState<IRiderContextState>({
        fetch: {
            fetchingRiders: false,
        },
        inputs: {
          email: '',
          phoneNumber: '',
          userName: '',
          walletBalance: '',
        },
        local: {
            allRiders: [],
            newRiders: [],
            selectedRider: null,
            riderOrders: [],
            riderTransactions: []
        }
    })

    const setFetchState = ({
        key,
        value,
      }: {
        key: keyof IRidersContextFetchState;
        value: boolean;
      }) => { 
         updateState((prev) => ({
      ...prev,
      fetch: {
        ...prev.fetch,
        [key]: value,
      },
    }));
    }
    const setInputState = ({
    key,
    value,
  }: {
    key: keyof IRidersContextInputState;
    value: boolean;
  }) => { 
         updateState((prev) => ({
      ...prev,
      inputs: {
        ...prev.inputs,
        [key]: value,
      },
    }));
    }
    const setLocalState = ({
    key,
    value,
  }: {
    key: keyof IRidersContextLocalState;
    value: boolean;
  }) => { 
         updateState((prev) => ({
      ...prev,
      local: {
        ...prev.local,
        [key]: value,
      },
    }));
    }

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