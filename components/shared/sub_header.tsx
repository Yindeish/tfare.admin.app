import { ReactNode } from "react";

interface ISubHeader {
    baseContainerClassName?: string,
    innerContainerClassName?: string,
    leading?: ReactNode,
    trailing?: ReactNode
}

function SubHeader({
    baseContainerClassName = '',
    innerContainerClassName = '',
    leading,
    trailing
}: ISubHeader) {


    return (
        <div className={`w-full h-[60px] flex justify-center bg-white border-y-[0.7px] border-y-d7d7d7 ${baseContainerClassName}`}>
            <div className={`w-[85%] h-full flex items-center justify-between ${innerContainerClassName}`}>
                {leading && leading}

                {trailing && trailing}
            </div>
        </div>
    )
}

export default SubHeader;