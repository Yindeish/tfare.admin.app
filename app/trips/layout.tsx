import TripContextProvider from "@/context.state/trip";
import { ReactNode } from "react";


function RidersLayout({ children }: { children: ReactNode }) {



    return (<TripContextProvider>
        {
            children
        }
    </TripContextProvider>)
}

export default RidersLayout;