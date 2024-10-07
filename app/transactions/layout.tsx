import TransactionContextProvider from "@/context.state/transaction";
import { ReactNode } from "react";


function TicketsLayout({ children }: { children: ReactNode }) {



    return (<TransactionContextProvider>
        {
            children
        }
    </TransactionContextProvider>)
}

export default TicketsLayout;