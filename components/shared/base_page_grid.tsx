import { ReactNode } from "react";
import Header from "./header";
import Sidebar from "./sidebar";


function BasePageGrid({ children }: { children: ReactNode }) {


    return (
        <div className="w-screen h-screen grid grid-cols-[15vw_85vw] grid-rows-[10vh_90vh] overflow-hidden">
            {/* //!Menu */}
            <div className="col-start-1 col-end-2 row-start-1 row-end-2 border-r-[1px] border-r-d7d7d7 pl-[1em] flex items-end">
                <span className="font-normal text-[14px] text-747474 w-full">MENU</span>
            </div>
            {/* //!Menu */}

            {/* //!Header */}
            <div className="col-start-2 -col-end-1 row-start-1 row-end-2">
                <Header />
            </div>
            {/* //!Header */}

            {/* //!Sidebar */}
            <div className="col-start-1 col-end-2 row-start-2 -row-end-1">
                <Sidebar />
            </div>
            {/* //!Sidebar */}

            {/* //!Main */}
            <div className="col-start-2 -col-end-1 row-start-2 -row-end-1">
                {children}
            </div>
            {/* //!Main */}

        </div>
    )
}

export default BasePageGrid;