'use client'
import { LuClock3 } from "react-icons/lu";
import KeyValueBlock from "@/components/shared/key_value_block";
import { useModal } from "@/context.state/shared/modal";
import { Expand } from "@/public/icons/homeSvgs";
import { useState } from "react";
import { useTicketContext } from "@/context.state/ticket";
import TicketModal from "./modalComponents";

function TicketGridView({ currentFilter }: { currentFilter: "user" | "driver" }) {
    const { showModal } = useModal()
    const { handlers } = useTicketContext()

    const arr = Array.from({ length: 20 });

    return (<div className="w-[85%] h-[calc(100%-74px)] mx-auto py-[1em] bg-f9f7f8 overflow-y-scroll">

        <div className="w-full h-fit grid grid-cols-3 gap-[1em]">
            {arr.map((_, index) => (
                <div
                    className="col-span-1 w-full h-[40vh] flex flex-col gap-[1em] rounded-[20px] p-[1.3em] border-[0.7px] border-FFAE02 bg-white" style={{ boxShadow: '0px 0px 10px 0px #00000010' }} key={index}>

                    <div className="w-full h-fit flex items-start justify-between">

                        <div className="w-[70%] flex flex-col gap-[12px]">
                            <span className="font-medium text-[14px] text-black">Ride #1234567XYZ</span>

                            <span className="inline-flex gap-[0.3em] items-center w-fit h-fit">
                                <LuClock3 className="text-27AE65 w-[16px] h-[16px]" />
                                <span className="font-normal text-[12px] text-747474">15:23</span></span>
                        </div>

                        <Expand onClick={() => {
                            handlers.setLocalState({
                                key: 'selectedTicket', value: {

                                }
                            })
                            showModal(<TicketModal />, false)
                        }} className="w-[18px] h-[18px] text-747474 cursor-pointer" />
                    </div>

                    <KeyValueBlock
                        keyValueArray={
                            currentFilter === 'driver' ?
                                [
                                    { key: 'Driver Name', value: 'Folagbade Roman' },
                                    { key: 'Phone Number', value: '+234 715 615 8715' },
                                    { key: 'Email Address', value: 'michelle11@gmail.com' },
                                    { key: 'Comment', value: 'Lorem ipsum dolor sit ...' },
                                ]
                                :
                                [
                                    { key: 'User Name', value: 'Folagbade Roman' },
                                    { key: 'Pickup', value: 'Ojoo Bus Stop' },
                                    { key: 'Endpoint', value: 'Dugbe Bus Stop' },
                                    { key: 'Comment', value: 'Lorem ipsum dolor sit ...' },
                                ]
                        }
                        containerClassName="gap-[0.75em] pt-[1em] border-t-[0.7px] border-t-d7d7d7"
                        keyClassName="font-normal text-[14px] text-747474"
                        valueClassName="font-normal text-[14px] text-black"
                    />

                </div>
            ))}

        </div>
    </div>)
}


export { TicketGridView };
