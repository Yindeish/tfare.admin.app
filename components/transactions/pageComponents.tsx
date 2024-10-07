'use client'
import { LuClock3 } from "react-icons/lu";
import KeyValueBlock from "@/components/shared/key_value_block";
import { useModal } from "@/context.state/shared/modal";
import { Bus, Expand } from "@/public/icons/homeSvgs";
import { useState } from "react";
import { useTransactionContext } from "@/context.state/transaction";
import TransactionModal from "./modalComponents";
import StatusBadge from "../shared/status_badge";

function RowView({ currentFilter }: { currentFilter: "user" | "driver" }) {
    const { showModal } = useModal()
    const { handlers } = useTransactionContext()

    const arr = Array.from({ length: 20 });

    return (
        <div className="w-full h-full">

            {/* //!Collections Header */}
            <div className="w-full h-[60px] border-y-[0.7px] border-y-d7d7d7 bg-f9f7f8">
                <div className="w-[90%] h-full mx-auto grid grid-cols-6">
                    {['Transaction Type', 'Order ID', 'Date', 'Time', 'Price', currentFilter === 'user' ? 'User Name' : 'Driver Name'].map((item, index) => (
                        <span className="col-span-1 font-medium text-14px] leading-[18px] text-747474 text-center flex items-center justify-center " key={index}>{item}</span>
                    ))}
                </div>
            </div>
            {/* //!Collections Header */}
            {/* //!Collections Body */}
            <div className="w-full h-[calc(100%-60px)]">
                {/* //!(90%+5px) +5px here is coming from the scroll bar  */}
                <div className="w-[calc(90%+5px)] h-full mx-auto overflow-y-scroll">
                    {/* //!(90%+5px) +5px here is coming from the scroll bar  */}
                    {Array.from({ length: 20 }).map((_, index) => (
                        <div className="w-full h-[60px] mx-auto grid grid-cols-6 bg-white pb-[1em]" key={index}>

                            <span className="col-span-1 font-medium text-14px] leading-[18px] text-747474 flex items-center justify-center gap-[0.5em] ">
                                <span>Bank Transfer</span>
                            </span>

                            <span className=" flex items-center justify-center">#7654321XYZ</span>

                            <span className=" flex items-center justify-center">April 14, 2024</span>

                            <span className=" flex items-center justify-center">08:45 AM</span>

                            <span className=" flex items-center justify-center">₦ 500.00</span>

                            <span className="flex items-center justify-center">{currentFilter === 'user' ? 'Michelle White' : 'John Shane'}</span>

                        </div>
                    ))}
                </div>
            </div>
            {/* //!Collections Body */}

        </div>)
}


export { RowView };
