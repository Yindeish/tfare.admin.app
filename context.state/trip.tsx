"use client";
import { createContext, FC, ReactNode, useContext, useState } from "react";
import { IRide } from "./ride";
import { IRoute } from "./route";

// !Interfaces
// !Input State
interface ITripContextInputState {
  status: "ongoing" | "completed";
  method: "order" | "user";
}
// !Input State

// !Local State
interface ITripContextLocalState {
  allTrips: [];
  newTrips: [];
  selectedTrip: ITrip | null;
}
// !Local State

// !Fetch State
export interface ITripContextFetchState {
  fetchingRides: boolean;
}
// !Fetch State

interface ITripContextState {
  inputs: ITripContextInputState;
  local: ITripContextLocalState;
  fetch: ITripContextFetchState;
}

// !Individuals
export interface ITrip {
  _id: string;
  driverId: string;
  driverName?: string;
  availableSeats: number;
  departureDate: string;
  departureTime: string;
  routeId: string;
  route?: IRoute;
  ridersRides: IRide[];
  createdAt: Date;
  updatedAt: Date;
}
// !Individuals

interface ITripContext {
  state: ITripContextState;
  handlers: {
    setInputState: ({
      key,
      value,
    }: {
      key: keyof ITripContextInputState;
      value: any;
    }) => void;
    setLocalState: ({
      key,
      value,
    }: {
      key: keyof ITripContextLocalState;
      value: any;
    }) => void;
    setFetchState: ({
      key,
      value,
    }: {
      key: keyof ITripContextFetchState;
      value: any;
    }) => void;
  };
}

const TripContext = createContext<ITripContext | undefined>(undefined);

function TripContextProvider({ children }: { children: ReactNode }) {
  const [state, updateState] = useState<ITripContextState>({
    fetch: {
        fetchingRides: false
    },
    inputs: {
        method: 'order',
        status: 'ongoing'
    },
    local: {
      allTrips: [],
      newTrips: [],
      selectedTrip: null,
    },
  });

  const setFetchState = ({
    key,
    value,
  }: {
    key: keyof ITripContextFetchState;
    value: boolean;
  }) => {
    updateState((prev) => ({
      ...prev,
      fetch: {
        ...prev.fetch,
        [key]: value,
      },
    }));
  };
  const setInputState = ({
    key,
    value,
  }: {
    key: keyof ITripContextInputState;
    value: any;
  }) => {
    updateState((prev) => ({
      ...prev,
      inputs: {
        ...prev.inputs,
        [key]: value,
      },
    }));
  };
  const setLocalState = ({
    key,
    value,
  }: {
    key: keyof ITripContextLocalState;
    value: any;
  }) => {
    updateState((prev) => ({
      ...prev,
      local: {
        ...prev.local,
        [key]: value,
      },
    }));
  };

  return (
    <TripContext.Provider
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
    </TripContext.Provider>
  );
}

export default TripContextProvider;

export const useTripContext = () => {
  const context = useContext(TripContext);

  if (!context) {
    throw new Error("TripContextProvider must wrap a base Container!");
  } else return context;
};
