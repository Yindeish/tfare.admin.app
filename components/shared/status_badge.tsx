import { GoDotFill } from "react-icons/go";


function StatusBadge({ status, className = '', dotClassName = '' }: {
    className?: string,
    dotClassName?: string,
    status: 'active' | 'in-active'
}) {


    return (
        <span className={`w-fit h-fit rounded-full flex items-center gap-[1em] p-[0.5em] ${status === 'active' ? 'bg-27AE6510 text-27AE65' : ''} ${className}`}>
            <GoDotFill className={`text-27AE65 w-[20px] h-[20px] ${dotClassName}`} />
            <span className="">Active</span>
        </span>
    )
}

export default StatusBadge;