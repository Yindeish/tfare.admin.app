'use client'
import { usePathname } from "next/navigation";
import HeaderUserBlock from "./headerUserBlock";


function Header() {
    const path = usePathname()
    const title = () => {
        const titleStr = path.slice(1, path.length)
        if (titleStr == 'home') return 'Dashboard'
        if (titleStr == 'in_app_banners') return 'In-app Banner'
        if (titleStr == 'tickets') return 'Support Tickets'
        else return titleStr
    }

    return (
        <header className="w-[85%] h-full ml-auto flex items-center justify-between gap-[1.5em] pr-[1.5em]">
            <span className="text-[32px] font-medium text-black capitalize">{title() || ''}</span>

            {/* //!Input Block */}
            <div className="w-[367px] h-[50px] relative">
                {/* //!Search */}
                <svg className="w-[21px] h-[21px] absolute top-[calc((100%-21px)/2)] left-[15px] z-[2]" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.0859 17.4575C16.5042 17.4575 20.0859 13.8758 20.0859 9.4575C20.0859 5.03922 16.5042 1.4575 12.0859 1.4575C7.66766 1.4575 4.08594 5.03922 4.08594 9.4575C4.08594 13.8758 7.66766 17.4575 12.0859 17.4575Z" stroke="#747474" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12.0859 14.4575C14.8459 14.4575 17.0859 12.2175 17.0859 9.4575" stroke="#747474" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.195 13.5175L1.585 17.1275C0.805 17.9075 0.805 19.1775 1.585 19.9575C2.365 20.7375 3.635 20.7375 4.415 19.9575L8.025 16.3475" stroke="#747474" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {/* //!Search */}

                {/* //!Input */}
                <input className="w-full h-full border-[1px] border-d7d7d7 rounded-full p-[0.3em] pl-[42px] active:border-black active:outline focus:border-black focus-within:border-black active:outline-none focus-within:outline-none focus:outline-none" type="text" placeholder="Search" />
                {/* //!Input */}
            </div>
            {/* //!Input Block */}

            <HeaderUserBlock />

        </header>
    )
}

export default Header;