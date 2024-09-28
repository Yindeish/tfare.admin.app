import { ReactNode } from "react";


function BasePageGrid({ children }: { children: ReactNode }) {


    return (
        <div className="w-screen h-screen grid grid-cols-[15vw_85vw] grid-rows-[15vh_85vh] overflow-hidden">
            {/* //!Menu */}
            <div className="col-start-1 col-end-2 row-start-1 row-end-2 border-r-[1px] border-r-d7d7d7">

            </div>
            {/* //!Menu */}

            {/* //!Header */}
            <div className="col-start-2 -col-end-1 row-start-1 row-end-2"></div>
            {/* //!Header */}

            {/* //!Sidebar */}
            <div className="col-start-1 col-end-2 row-start-2 -row-end-1"></div>
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