import { GoDotFill } from "react-icons/go";


function StatusBadge({ status, className = '', dotClassName = '', enabled = true }: {
    className?: string,
    dotClassName?: string,
    status: string,
    enabled?: boolean
}) {


    return (
        <span className={`w-fit h-fit rounded-full flex items-center gap-[1em] p-[0.5em] ${enabled ? 'bg-27AE6510 text-27AE65' : 'bg-f9f7f8 text-747474'} ${className}`}>
            <GoDotFill className={`${enabled ? 'text-27AE65' : 'text-747474'} w-[20px] h-[20px] ${dotClassName}`} />
            <span className="capitalize">{status}</span>
        </span>
    )
}

export default StatusBadge;