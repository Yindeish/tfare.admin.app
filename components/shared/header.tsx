'use client'
import { usePathname } from "next/navigation";
import HeaderUserBlock from "./headerUserBlock";
import Search from "../routes/svgs/search";
import { useAuthContext } from "@/context.state/auth";


function Header() {
    const path = usePathname()
    const title = () => {
        const titleStr = path.slice(1, path.length)
        if (titleStr == 'home') return 'Dashboard'
        if (titleStr == 'in_app_banners') return 'In-app Banner'
        if (titleStr == 'tickets') return 'Support Tickets'
        else return titleStr
    };

    return (
        <header className="w-[85%] h-full ml-auto flex items-center justify-between gap-[1.5em] pr-[1.5em]">
            <span className="text-[32px] font-medium text-black capitalize">{title() || ''}</span>

            {/* //!Input Block */}
            <div className="w-[367px] h-[50px] relative">
                {/* //!Search */}
                <span className="w-[21px] h-[21px] absolute top-[calc((100%-21px)/2)] left-[15px] z-[2]">
                <Search />
                </span>
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