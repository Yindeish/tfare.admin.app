'use client'
import { createContext, FC, ReactNode, useContext, useState } from "react";
import { IBusStop, IPlan, IRoute } from "./route";
import { IUser } from "./auth";


// !Interfaces
// !Input State
interface IRideContextInputState {
    status: 'ongoing' | 'completed',
    method: 'order' | 'user'
}
// !Input State

// !Local State
interface IRideContextLocalState {
    allRides: ((ICurrentRide & IRide) & {route: IRoute, driver?: IUser, rider?: IUser, purchasedTickets?: number})[];
    ridesDisplayList: ((ICurrentRide & IRide) & {route: IRoute, driver?: IUser, rider?: IUser, purchasedTickets?: number})[];
    selectedRide: ((ICurrentRide & IRide) & {route: IRoute, driver?: IUser, rider?: IUser, purchasedTickets?: number}) | null;
}
// !Local State

// !Fetch State
export interface IRideContextFetchState {
   fetchingRides: boolean;
}
// !Fetch State

interface IRideContextState {
    inputs: IRideContextInputState,
    local: IRideContextLocalState,
    fetch: IRideContextFetchState,
}

// !Individuals
export type TRideStatus = 
| "requesting"
| "cancelled"
| "accepted"
| "declined"
| "started"
| "booked"
| "ended"
| "paused";
export interface IRide {
    _id: string;
    pickupBusstop: IBusStop;
    dropoffBusstop: IBusStop;
    riderId: string;
    ticketsIds: string[];
    duration: string;
    ridePlan: IPlan;
    rideStatus: TRideStatus;
    riderCounterOffer: number;
    currentRideId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICurrentRide {
    _id: string;
    driverId: string;
    availableSeats: number;
    vehicleName: string;
    routeId: string;
    ridersRides: IRide[];
    createdAt: Date;
    updatedAt: Date;
}
// !Individuals


interface IRideContext {
    state: IRideContextState,
    handlers: {
        setInputState: ({ key, value }: { key: keyof IRideContextInputState, value: any }) => void,
        setLocalState: ({ key, value }: { key: keyof IRideContextLocalState, value: any }) => void,
        setFetchState: ({ key, value }: { key: keyof IRideContextFetchState, value: boolean }) => void,
    }
}

const RideContext = createContext<IRideContext | undefined>(undefined)

function RideContextProvider({ children }: { children: ReactNode }) {
    const [state, updateState] = useState<IRideContextState>({
        fetch: {
            fetchingRides: false
        },
        inputs: {
            method: 'order',
            status: 'ongoing'
        },
        local: {
            allRides: [],
            ridesDisplayList: [],
            selectedRide: null
        }
    })

    const setFetchState = ({ key, value }: { key: keyof IRideContextFetchState, value: boolean }) => { 
        updateState((prev) => ({
            ...prev,
            fetch: {
                ...prev.fetch,
                [key]: value
            }
        }))
    }
    const setInputState = ({ key, value }: { key: keyof IRideContextInputState, value: any }) => { 
        updateState((prev) => ({
            ...prev,
            inputs: {
                ...prev.inputs,
                [key]: value
            }
        }))
    }
    const setLocalState = ({ key, value }: { key: keyof IRideContextLocalState, value: any }) => { 
        updateState((prev) => ({
            ...prev,
            local: {
                ...prev.local,
                [key]: value
            }
        }))
    }

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