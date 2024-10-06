

function Loading() {


    return (
        <div className="w-screen h-screen grid grid-cols-[13vw_87vw] grid-rows-[10vh_90vh] gap-[0.3em] overflow-hidden bg-d7d7d7">
            {/* //!Menu */}
            <div className="col-start-1 col-end-2 row-start-1 row-end-2 rounded-[10px] bg-747474 animate-pulse">

            </div>
            {/* //!Menu */}

            {/* //!Header */}
            <div className="col-start-2 -col-end-1 row-start-1 row-end-2 flex items-center justify-center gap-[3em] bg-747474 rounded-[10px] animate-pulse">
                <span className="w-[100px] h-[70%] rounded-[10px] bg-d7d7d7 animate-pulse"></span>

                {/* //!Input Block */}
                <div className="w-[367px] h-[50px] rounded-full bg-d7d7d7 animate-pulse"></div>
                {/* //!Input Block */}

                <div className="w-fit h-[90%] flex items-center gap-[1em]">
                    <span className="w-[50px] h-[50px] rounded-full bg-d7d7d7 animate-pulse"></span>

                    <div className="w-[110px] h-full flex flex-col justify-center gap-[1em]">
                        <div className="w-[110px] h-[20%] rounded-[10px] bg-d7d7d7 animate-pulse"></div>
                        <div className="w-[110px] h-[20%] rounded-[10px] bg-d7d7d7 animate-pulse"></div>
                    </div>
                </div>
            </div>
            {/* //!Header */}

            {/* //!Sidebar */}
            <div className="col-start-1 col-end-2 row-start-2 -row-end-1 flex flex-col gap-[1em] p-[1em] bg-747474 rounded-[10px] animate-pulse">

                {Array.from({ length: 10 }).map((_, index) => (
                    <div className="w-full h-[30px] rounded-[10px] bg-d7d7d7" key={index}></div>
                ))}

            </div>
            {/* //!Sidebar */}

            {/* //!Main */}
            <div className="col-start-2 -col-end-1 row-start-2 -row-end-1 bg-747474 rounded-[10px] animate-pulse">

            </div>
            {/* //!Main */}

        </div>
    )
}

export default Loading;