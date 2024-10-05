import RiderContextProvider from "@/context.state/rider";
import { ReactNode } from "react";


function DriversLayout({ children }: { children: ReactNode }) {



    return (<RiderContextProvider>
        {
            children
        }
    </RiderContextProvider>)
}

export default DriversLayout;