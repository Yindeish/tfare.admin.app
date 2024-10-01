import { ReactNode } from "react";


function KeyValueBlock({
    keyValueArray,
    containerClassName = '',
    keyClassName = '',
    valueClassName = '',
}: {
    containerClassName?: string,
    keyClassName?: string,
    valueClassName?: string,
    keyValueArray: { key: ReactNode, value: ReactNode }[]
}) {


    return (
        <div className={`w-full h-fit flex flex-col gap-[20px] ${containerClassName}`}>
            {keyValueArray.map(({ key, value }, index) => (
                <div className="w-full flex items-center justify-between" key={index}>
                    <div className={`w-fit ${keyClassName}`}>{key}</div>

                    <div className={`w-fit ${valueClassName}`}>{value}</div>
                </div>
            ))}
        </div>
    )
}

export default KeyValueBlock;