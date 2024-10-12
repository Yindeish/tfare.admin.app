import TicketContextProvider from "@/context.state/ticket";
import { ReactNode } from "react";


function TicketsLayout({ children }: { children: ReactNode }) {



    return (<TicketContextProvider>
        {
            children
        }
    </TicketContextProvider>)
}

export default TicketsLayout;