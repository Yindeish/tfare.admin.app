'use client'
import homeimages from "@/constants/images/home";
import { Buckets, Bus, CarProceed, Expand, HeadPhone } from "@/public/icons/homeSvgs";
import { useRouter } from "next/navigation";
import { GoChevronDown } from "react-icons/go";



function Home() {
    const router = useRouter()

    return (
        <div className="w-full h-full p-[2em] bg-f9f7f8 grid grid-cols-4 grid-rows-[27%_73%] gap-[24px]">

            {/* //!Shortcuts, Active Rides, Active Trips, Pending Tickets, Total Earnings */}
            {[
                { title: 'Active Rides', value: '124', link: '/rides', icon: <CarProceed className="text-EF5DA8 w-[29px] h-[25px]" /> },
                { title: 'Active trips', value: '157', link: '/trips', icon: <Bus className="text-EF5DA8 w-[30px] h-[30px]" /> },
                { title: 'Pending Tickets', value: '13', link: '/tickets', icon: <HeadPhone className="text-EF5DA8 w-[30px] h-[25px]" /> },
                { title: 'Total Earnings', value: '200', link: '/earnings', icon: <Buckets className="text-EF5DA8 w-[30px] h-[30px]" /> },
            ].map(({ icon, title, value, link }, index) => (
                <div className="col-span-1 row-span-1 w-full h-full rounded-[10px] flex flex-col gap-[10px] p-[0.85em] bg-white" style={{ boxShadow: '0px 0px 10px 0px #00000010' }} key={index}>
                    <div className="w-full flex items-center justify-between">
                        {icon}

                        <span onClick={() => router.push(link)}>
                            <Expand className="w-[18px] h-[18px] text-747474 cursor-pointer" />
                        </span>
                    </div>

                    <span className="text-[22px] leading-[22px] font-normal text-black">{title}</span>

                    <span className="text-[48px] leading-[40px] font-normal text-black">{value}</span>
                </div>
            ))}
            {/* //!Shortcuts, Active Rides, Active Trips, Pending Tickets, Total Earnings */}

            {/* //!Map */}
            <div className="col-start-1 col-span-full row-start-2 -row-end-1 bg-white rounded-[10px] flex flex-col gap-[10px] py-[0.85em] px-[1.2em]">
                <div className="flex items-center justify-between">
                    <span className="font-medium text-[32px] text-black">City Map</span>

                    <span className="bg-white rounded-[10px] border-[0.7px] border-d7d7d7 flex items-center gap-[10px] p-[0.5em] cursor-pointer">
                        <span className="font-medium text-[14px] text-black">Trips</span>

                        <GoChevronDown className="text-747474 w-[25px] h-[18px]" />
                    </span>
                </div>

                <img className="w-full h-[85%] rounded-[15px]" src={homeimages.map.src} alt="" />
            </div>
            {/* //!Map */}
        </div>
    )
}

export default Home;