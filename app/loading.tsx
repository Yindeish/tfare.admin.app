

function Loading() {


    return (
        <div className="w-screen h-screen grid grid-cols-[13vw_87vw] grid-rows-[10vh_90vh] overflow-hidden">
            {/* //!Menu */}
            <div className="col-start-1 col-end-2 row-start-1 row-end-2 bg-slate-200 animate-pulse border-r-[1px] border-r-d7d7d7 pl-[1em] flex items-end">

            </div>
            {/* //!Menu */}

            {/* //!Header */}
            <div className="col-start-2 -col-end-1 row-start-1 row-end-2 bg-slate-200 animate-pulse">

            </div>
            {/* //!Header */}

            {/* //!Sidebar */}
            <div className="col-start-1 col-end-2 row-start-2 -row-end-1 bg-slate-200 animate-pulse">

            </div>
            {/* //!Sidebar */}

            {/* //!Main */}
            <div className="col-start-2 -col-end-1 row-start-2 -row-end-1 bg-slate-200 animate-pulse">

            </div>
            {/* //!Main */}

        </div>
    )
}

export default Loading;