"use client";
import { createContext, FC, ReactNode, useContext, useState } from "react";
import { IUser } from "./auth";

// !Interfaces
// !Input State
interface IDriversContextInputState {}
// !Input State

// !Local State
interface IDriversContextLocalState {
  allDrivers: IUser[];
  newDrivers: IUser[];
  selectedDriver: Driver | null;
}
// !Local State

// !Fetch State
export interface IDriversContextFetchState {
  fetchingDrivers: boolean;
}
// !Fetch State

interface IDriverContextState {
  inputs: IDriversContextInputState;
  local: IDriversContextLocalState;
  fetch: IDriversContextFetchState;
}

// !Individuals
interface Driver {}
// !Individuals

interface IDriverContext {
  state: IDriverContextState;
  handlers: {
    setInputState: ({
      key,
      value,
    }: {
      key: keyof IDriversContextInputState;
      value: any;
    }) => void;
    setLocalState: ({
      key,
      value,
    }: {
      key: keyof IDriversContextLocalState;
      value: any;
    }) => void;
    setFetchState: ({
      key,
      value,
    }: {
      key: keyof IDriversContextFetchState;
      value: any;
    }) => void;
  };
}

const DriverContext = createContext<IDriverContext | undefined>(undefined);

function DriverContextProvider({ children }: { children: ReactNode }) {
  const [state, updateState] = useState<IDriverContextState>({
    fetch: {
      fetchingDrivers: false,
    },
    inputs: {},
    local: {
      allDrivers: [],
      newDrivers: [],
      selectedDriver: null,
    },
  });

   const setFetchState = ({
          key,
          value,
        }: {
          key: keyof IDriversContextFetchState;
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
      key: keyof IDriversContextInputState;
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
      key: keyof IDriversContextLocalState;
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
    <DriverContext.Provider
      value={{
        state,
        handlers: {
          setFetchState,
          setInputState,
          setLocalState,
        },
      }}
    >
      {children}
    </DriverContext.Provider>
  );
}

export default DriverContextProvider;

export const useDriverContext = () => {
  const context = useContext(DriverContext);

  if (!context) {
    throw new Error("DriverContextProvider must wrap a base Container!");
  } else return context;
};
