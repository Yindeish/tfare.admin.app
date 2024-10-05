import RiderContextProvider from "@/context.state/rider";
import { ReactNode } from "react";


function RidersLayout({ children }: { children: ReactNode }) {



    return (<RiderContextProvider>
        {
            children
        }
    </RiderContextProvider>)
}

export default RidersLayout;