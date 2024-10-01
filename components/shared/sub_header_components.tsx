import { BsGridFill } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";

interface ICTA {
    svgClassName: string,
    onClick: Function
}

function GridViewCTA({ onClick, svgClassName }: ICTA) {


    return (
        <span onClick={() => onClick()} className="w-[45px] h-[45px] rounded-full flex items-center justify-center border-[0.7px] border-d7d7d7 cursor-pointer">
            <BsGridFill className={svgClassName} />
        </span>
    )
}

function RowViewCTA({ onClick, svgClassName }: ICTA) {


    return (
        <span onClick={() => onClick()} className="w-[45px] h-[45px] rounded-full flex items-center justify-center border-[0.7px] border-d7d7d7 cursor-pointer">
            <RxHamburgerMenu className={svgClassName} />
        </span>
    )
}

function SortCTA({ onClick }: Pick<ICTA, 'onClick'>) {


    return (
        <span onClick={() => onClick()} className="w-fit h-[45px] rounded-full flex items-center justify-center gap-[10px] border-[0.7px] border-d7d7d7 p-[1em] cursor-pointer">
            <svg className="w-[20px] h-[20px] text-black" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 3.5H1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M19.5 3.5H10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.5 5.5C7.60457 5.5 8.5 4.60457 8.5 3.5C8.5 2.39543 7.60457 1.5 6.5 1.5C5.39543 1.5 4.5 2.39543 4.5 3.5C4.5 4.60457 5.39543 5.5 6.5 5.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4.5 15.5H1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M19.5 15.5H10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.5 17.5C7.60457 17.5 8.5 16.6046 8.5 15.5C8.5 14.3954 7.60457 13.5 6.5 13.5C5.39543 13.5 4.5 14.3954 4.5 15.5C4.5 16.6046 5.39543 17.5 6.5 17.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16.5 9.5H19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1.5 9.5H10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.5 11.5C15.6046 11.5 16.5 10.6046 16.5 9.5C16.5 8.39543 15.6046 7.5 14.5 7.5C13.3954 7.5 12.5 8.39543 12.5 9.5C12.5 10.6046 13.3954 11.5 14.5 11.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>


            <span className="text-[12px] font-medium text-black">Sort</span>
        </span>
    )
}

export { GridViewCTA, RowViewCTA, SortCTA };