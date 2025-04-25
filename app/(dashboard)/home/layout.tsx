import HomeContextProvider from "@/context.state/home";
import { ReactNode } from "react";


function HomeLayout({ children }: { children: ReactNode }) {


    return (<HomeContextProvider>
        {
            children
        }
    </HomeContextProvider>)
}

export default HomeLayout;