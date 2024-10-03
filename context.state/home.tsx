'use client';
import { createContext, FC, ReactNode, useContext, useState } from "react";

// !Types
// !Types

// !Interfaces
// !Input State
interface IDashboardContextSharedInputState {

}

interface IDashboardContextRidersInputState {

}
// !Input State

// !Local State
interface IDashboardContextRidersLocalState {
    allRiders: [],
    newRiders: [],
    selectedRider: Rider | null,
}
// !Local State

// !General
interface Rider {

}

interface IDashboardContext {
    rider: {
        state: {
            inputs: IDashboardContextRidersInputState,
            local: IDashboardContextRidersLocalState,
            fetch: {},
        },
        handlers: {

        }
    },
    driverState: {
        inputs: {},
        fetch: {},
        local: {}
    },
    rideState: {
        inputs: {},
        fetch: {},
        local: {}
    },
    tripState: {
        inputs: {},
        fetch: {},
        local: {}
    },
    routeState: {
        inputs: {},
        fetch: {},
        local: {}
    },
    bannerState: {
        inputs: {},
        fetch: {},
        local: {}
    },
    ticketState: {
        inputs: {},
        fetch: {},
        local: {}
    },
    transactionState: {
        inputs: {},
        fetch: {},
        local: {}
    },
    adminState: {
        inputs: {},
        fetch: {},
        local: {}
    },
}
// !General
// !Interfaces


const DashboardContext = createContext<IDashboardContext | undefined>(undefined)

const DashboardContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [riderState, updateRiderState] = useState({
        fetch: {},
        inputs: {},
        local: {
            allRiders: [],
            newRiders: [],
            selectedRider: null
        }
    })
    // const state: IDashboardContextState = {
    //     riderState,
    //     driverState: {
    //         fetch: {},
    //         inputs: {},
    //         local: {}
    //     },
    //     adminState: {
    //         fetch: {},
    //         inputs: {},
    //         local: {}
    //     },
    //     bannerState: {
    //         fetch: {},
    //         inputs: {},
    //         local: {}
    //     },
    //     rideState: {
    //         fetch: {},
    //         inputs: {},
    //         local: {}
    //     },
    //     routeState: {
    //         fetch: {},
    //         inputs: {},
    //         local: {}
    //     },
    //     ticketState: {
    //         fetch: {},
    //         inputs: {},
    //         local: {}
    //     },
    //     transactionState: {
    //         fetch: {},
    //         inputs: {},
    //         local: {}
    //     },
    //     tripState: {
    //         fetch: {},
    //         inputs: {},
    //         local: {}
    //     },
    // }

    return (
        <DashboardContext.Provider value={{
            adminState,
            bannerState,
            driverState,
            rider: {
                handlers: {},
                state: riderState
            },
            rideState,
            routeState,
            ticketState,
            transactionState,
            tripState
        }}>
            {children}
        </DashboardContext.Provider>
    )
}

export default DashboardContextProvider;

export const useDashboardContext = () => {

    const context = useContext(DashboardContext);

    if (!context) {
        throw new Error('DashboardContextProvider must wrap a base Container!')
    }
    else return context;
}