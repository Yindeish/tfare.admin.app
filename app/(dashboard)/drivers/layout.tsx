import DriverContextProvider from "@/context.state/driver";
import { ReactNode } from "react";


function DriversLayout({ children }: { children: ReactNode }) {



    return (<DriverContextProvider>
        {
            children
        }
    </DriverContextProvider>)
}

export default DriversLayout;