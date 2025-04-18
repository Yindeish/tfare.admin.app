import RouteContextProvider from "@/context.state/route";
import { ReactNode } from "react";


function TicketsLayout({ children }: { children: ReactNode }) {



    return (<RouteContextProvider>
        {
            children
        }
    </RouteContextProvider>)
}

export default TicketsLayout;