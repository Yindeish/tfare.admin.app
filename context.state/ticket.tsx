"use client";
import { createContext, FC, ReactNode, useContext, useState } from "react";

// !Interfaces
// !Input State
interface ITicketContextInputState {}
// !Input State

// !Local State
interface ITicketContextLocalState {
  allTickets: [];
  newTickets: [];
  selectedTicket: ITicket | null;
}
// !Local State

// !Fetch State
export interface ITicketContextFetchState {
  fetchingTickets: boolean;
}
// !Fetch State

interface ITicketContextState {
  inputs: ITicketContextInputState;
  local: ITicketContextLocalState;
  fetch: ITicketContextFetchState;
}

// !Individuals
export interface ITicket {}
// !Individuals

interface ITicketContext {
  state: ITicketContextState;
  handlers: {
    setInputState: ({
      key,
      value,
    }: {
      key: keyof ITicketContextInputState;
      value: any;
    }) => void;
    setLocalState: ({
      key,
      value,
    }: {
      key: keyof ITicketContextLocalState;
      value: any;
    }) => void;
    setFetchState: ({
      key,
      value,
    }: {
      key: keyof ITicketContextFetchState;
      value: any;
    }) => void;
  };
}

const TicketContext = createContext<ITicketContext | undefined>(undefined);

function TicketContextProvider({ children }: { children: ReactNode }) {
  const [state, updateState] = useState<ITicketContextState>({
    fetch: {
      fetchingTickets: false,
    },
    inputs: {},
    local: {
      allTickets: [],
      newTickets: [],
      selectedTicket: null,
    },
  });

  const setFetchState = ({
      key,
      value,
    }: {
      key: keyof ITicketContextFetchState;
      value: any;
    }) => {
        updateState((prev) => ({
            ...prev,
            fetch: {
                ...prev.fetch,
                [key]: value
            }
        }))
    };

  const setInputState = ({
      key,
      value,
    }: {
      key: keyof ITicketContextInputState;
      value: any;
    }) => {
        updateState((prev) => ({
            ...prev,
            inputs: {
                ...prev.inputs,
                [key]: value
            }
        }))
    };

  const setLocalState = ({
      key,
      value,
    }: {
      key: keyof ITicketContextLocalState;
      value: any;
    }) => {
        updateState((prev) => ({
            ...prev,
            local: {
                ...prev.local,
                [key]: value
            }
        }))
    };

  return (
    <TicketContext.Provider
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
    </TicketContext.Provider>
  );
}

export default TicketContextProvider;

export const useTicketContext = () => {
  const context = useContext(TicketContext);

  if (!context) {
    throw new Error("TicketContextProvider must wrap a base Container!");
  } else return context;
};
