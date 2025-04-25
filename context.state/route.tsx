"use client";
import { createContext, FC, ReactNode, useContext, useState } from "react";

// !Interfaces
// !Input State
interface IRouteContextInputState {
  searchText: string;
  selectedBusstops: (IBusStop & { number: number })[];
  statusActive: boolean;
  selectedPaymentOptions: string[];
  customizable: boolean;
  unitFaresInputs: IUnitFareInput[];
  pickupBusstop: IBusStop | null;
  dropoffBusstop: IBusStop | null;
  fare: string;
  city: ICityInput | null;
  stateNameInput: string;
  cityNameInput: string;
  busstopNameInput: string;
  busstop: IBusStopInput | null;
  pickupNameInput: string,
  dropoffNameInput: string,
  driverCommission: string;
}
// !Input State

// !Local State
interface IRouteContextLocalState {
  allPresetRoutes: IRoute[];
  currentRoute: IRoute | null;
  routeCreationStage: "initial" | "final" | null;
  allBusstops: (IBusStop & { number: number })[];
  matchBusstops: (IBusStop & { number: number })[];
  unitFares: IUnitFare[];
  allCities: (ICity & { number: number })[]
}
// !Local State

// !Fetch
export interface IRouteContextFetchState {
  fetchingRoutes: boolean,
  fetchingCities: boolean,
  fetchingBusstops: boolean,
}
// !Fetch

interface IRouteContextState {
  inputs: IRouteContextInputState;
  local: IRouteContextLocalState;
  fetch: IRouteContextFetchState;
}

// !Individuals
export type TPlanName = "standard" | "premium";

export type ICityInput = Omit<ICity, "_id">;

export interface IUnitFareInput {
  pickupBusstop: IBusStop;
  dropoffBusstop: IBusStop;
  fare: number;
  selected: boolean;
  number: number;
}

export interface IPlan {
  routeId: string;
  planName: TPlanName;
  vehicleSeats: number;
  ride?: {
    rideFee: number;
  };
  trip?: {
    tripFee: number;
  };
  serviceFee?: number;
}

export interface IUnitFare {
  pickupBusstopId: string;
  dropoffBusstopId: string;
  plan: IPlan;
  _id: string;
}

export interface ICity {
  _id: string;
  name: string;
  stateName: string;
}

export type IBusStopInput  = Omit<IBusStop, '_id' | 'order'>;

export interface IBusStop {
  _id?: string;
  name: string;
  city: ICity;
  order: number;
}

type TAllowedPaymentOptions = "cash" | "online" | "wallet" | "point";

export interface IRoute {
  _id: string;
  pickupBusstop: IBusStop;
  dropoffBusstop: IBusStop;
  inTripDirection: "forward" | "backward";
  city: ICity;
  inTripDropoffs: IBusStop[],
  unitFares: IUnitFare[];
  editable: boolean;
  active: boolean;
  allowedPaymentOptions: TAllowedPaymentOptions[];
}
// !Individuals

interface IRouteContext {
  state: IRouteContextState;
  handlers: {
    setInputState: ({
      key,
      value,
    }: {
      key: keyof IRouteContextInputState;
      value: any;
    }) => void;
    setLocalState: ({
      key,
      value,
    }: {
      key: keyof IRouteContextLocalState;
      value: any;
    }) => void;
    setFetchState: ({
      key,
      value,
    }: {
      key: keyof IRouteContextFetchState;
      value: any;
    }) => void;
  };
}

const RouteContext = createContext<IRouteContext | undefined>(undefined);

function RouteContextProvider({ children }: { children: ReactNode }) {
  const [state, updateState] = useState<IRouteContextState>({
    fetch: {
      fetchingRoutes: false,
      fetchingBusstops: false,
      fetchingCities: false,
    },
    inputs: {
      searchText: "",
      selectedBusstops: [],
      statusActive: false,
      selectedPaymentOptions: [],
      customizable: true,
      unitFaresInputs: [],
      dropoffBusstop: null,
      pickupBusstop: null,
      fare: "",
      city: null,
      stateNameInput: "",
      cityNameInput: "",
      busstopNameInput: '',
      busstop: null,
      pickupNameInput: '',
      dropoffNameInput: '',
      driverCommission: ''
    },
    local: {
      allPresetRoutes: [],
      routeCreationStage: null,
      currentRoute: null,
      allBusstops: [],
      matchBusstops: [],
      unitFares: [],
      allCities: []
    },
  });

  const setFetchState = ({
    key,
    value,
  }: {
    key: keyof IRouteContextFetchState;
    value: any;
  }) => {
    updateState((prevState) => ({
      ...prevState,
      fetch: {
        ...prevState.fetch,
        [key]: value,
      },
    }));
  };

  const setInputState = ({
    key,
    value,
  }: {
    key: keyof IRouteContextInputState;
    value: any;
  }) => {
    updateState((prevState) => ({
      ...prevState,
      inputs: {
        ...prevState.inputs,
        [key]: value,
      },
    }));
  };

  const setLocalState = ({
    key,
    value,
  }: {
    key: keyof IRouteContextLocalState;
    value: any;
  }) => {
    updateState((prevState) => ({
      ...prevState,
      local: {
        ...prevState.local,
        [key]: value,
      },
    }));
  };

  return (
    <RouteContext.Provider
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
    </RouteContext.Provider>
  );
}

export default RouteContextProvider;

export const useRouteContext = () => {
  const context = useContext(RouteContext);

  if (!context) {
    throw new Error("RouteContextProvider must wrap a base Container!");
  } else return context;
};
