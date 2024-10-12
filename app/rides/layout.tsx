import RideContextProvider from "@/context.state/ride";
import { ReactNode } from "react";


function RidersLayout({ children }: { children: ReactNode }) {



    return (<RideContextProvider>
        {
            children
        }
    </RideContextProvider>)
}

export default RidersLayout;