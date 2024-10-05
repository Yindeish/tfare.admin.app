'use client'
import { DashboardGrid, Drivers, InAppBanners, LightGreyBgBus, LightGreyBgCar, Riders, Routes, Tickets, Transactions } from "@/public/icons/shared/sidebarSvgs";
import Link from "next/link";
import { usePathname } from "next/navigation";


function Sidebar() {
    const path = usePathname()

    const active_link = (link: string) => path == link || link.includes(path);
    const svgInactiveClassName = "w-[20px] h-[20px] fill-white text-747474"
    const svgActiveClassName = "w-[20px] h-[20px] fill-white text-5D5FEF"

    return (
        <div className="w-full h-full flex flex-col gap-[0em]" style={{ boxShadow: '5px 0px 10px 0px #00000010' }}>
            {/* //!Dashboard Home, Rides, Trips */}
            <div className="w-full h-fit pl-[1em] pb-[1em] flex flex-col gap-[0.3em] border-b-[0.7px] border-d7d7d7">

                {[
                    // { link: '/home', name: 'Dashboard', icon: <DashboardGrid className={active_link('/home') ? svgActiveClassName : svgInactiveClassName} /> },
                    { link: '/home', name: 'Dashboard', icon: <DashboardGrid className={active_link('/home') ? svgActiveClassName : svgInactiveClassName} /> },
                    { link: '/rides', name: 'All Rides', icon: <LightGreyBgCar className={active_link('/rides') ? svgActiveClassName : svgInactiveClassName} /> },
                    { link: '/trips', name: 'All Trips', icon: <LightGreyBgBus className={active_link('/trips') ? svgActiveClassName : svgInactiveClassName} /> },
                ].map(({ link, name, icon }, index) => (
                    <div className={`w-full h-fit flex items-center gap-[10px] border-[1px] ${active_link(link) ? 'bg-f9f7f8 rounded-tl-[10px] rounded-bl-[10px] border-d7d7d7' : 'bg-white border-transparent'} pl-[1em] py-[0.3em] `} key={index}>
                        {icon}

                        <Link className={`text-[16px] font-normal ${active_link(link) ? 'text-5D5FEF' : 'text-black'} capitalize`} href={link}>{name}</Link>
                    </div>
                ))}

            </div>
            {/* //!Dashboard Home, Rides, Trips */}

            {/* //!People, Riders, Drivers */}
            <div className="w-full h-fit pl-[1em] py-[1em] flex flex-col border-b-[0.7px] border-d7d7d7">

                {/* //!Title */}
                <span className="text-[14px] text-747474 font-normal">PEOPLE</span>
                {/* //!Title */}

                <div className="w-full flex flex-col gap-[0.3em]">
                    {[
                        { link: '/riders', name: 'Riders', icon: <Riders className={active_link('/riders') ? svgActiveClassName : svgInactiveClassName} /> },
                        { link: '/drivers', name: 'Drivers', icon: <Drivers className={active_link('/drivers') ? svgActiveClassName : svgInactiveClassName} /> },
                    ].map(({ link, name, icon }, index) => (
                        <div className={`w-full h-fit flex items-center gap-[10px] border-[1px] ${active_link(link) ? 'bg-f9f7f8 rounded-tl-[10px] rounded-bl-[10px] border-d7d7d7' : 'bg-white border-transparent'} pl-[1em] py-[0.3em] `} key={index}>
                            {icon}

                            <Link className={`text-[16px] font-normal ${active_link(link) ? 'text-5D5FEF' : 'text-black'} capitalize`} href={link}>{name}</Link>
                        </div>
                    ))}
                </div>

            </div>
            {/* //!People, Riders, Drivers */}

            {/* //!Others, Routes, In-app Banner, Support Tickets, Transactions */}
            <div className="w-full h-fit pl-[1em] py-[1em] flex flex-col border-b-[0.7px] border-d7d7d7">

                {/* //!Title */}
                <span className="text-[14px] text-747474 font-normal">OTHERS</span>
                {/* //!Title */}

                <div className="w-full flex flex-col gap-[0.3em]">
                    {[
                        { link: '/routes', name: 'Routes', icon: <Routes className={active_link('/routes') ? svgActiveClassName : svgInactiveClassName} /> },
                        { link: '/in_app_banners', name: 'In-app Banner', icon: <InAppBanners className={active_link('/in_app_banners') ? svgActiveClassName : svgInactiveClassName} /> },
                        { link: '/tickets', name: 'Support Tickets', icon: <Tickets className={active_link('/tickets') ? svgActiveClassName : svgInactiveClassName} /> },
                        { link: '/transactions', name: 'Transactions', icon: <Transactions className={active_link('/transactions') ? svgActiveClassName : svgInactiveClassName} /> },
                    ].map(({ link, name, icon }, index) => (
                        <div className={`w-full h-fit flex items-center gap-[10px] border-[1px] ${active_link(link) ? 'bg-f9f7f8 rounded-tl-[10px] rounded-bl-[10px] border-d7d7d7' : 'bg-white border-transparent'} pl-[1em] py-[0.3em] `} key={index}>
                            {icon}

                            <Link className={`text-[16px] font-normal ${active_link(link) ? 'text-5D5FEF' : 'text-black'} capitalize`} href={link}>{name}</Link>
                        </div>
                    ))}
                </div>

            </div>
            {/* //!Others, Routes, In-app Banner, Support Tickets, Transactions */}

            {/* //!Logout CTA */}
            <div className="w-full h-fit flex items-center justify-center">
                <span className="text-[16px] font-normal text-CF0707 pt-[1em] cursor-pointer">Logout</span>
            </div>
            {/* //!Logout CTA */}
        </div>
    )
}

export default Sidebar;