'use client'
import { LuClock3 } from "react-icons/lu";
import KeyValueBlock from "@/components/shared/key_value_block";
import { useLayoutContext } from "@/context.state/shared/layout";
import { useModal } from "@/context.state/shared/modal";
import { Expand } from "@/public/icons/homeSvgs";
import { useState } from "react";
import RideTripModal from "@/components/rides/modalComponents";
import StatusBadge from "../shared/status_badge";
import { useTripContext } from "@/context.state/trip";
import { Riders } from "@/public/icons/shared/sidebarSvgs";

function RideGridView() {
    const { showModal } = useModal()
    const { state, handlers } = useTripContext()

    return (<div className="w-[85%] h-[calc(100%-74px)] mx-auto py-[1em] bg-f9f7f8 overflow-y-scroll">

        <div className="w-full h-fit grid grid-cols-3 gap-[1em]">
        {state.local.allTrips?.map((item: any, index) => (
                <div
                    className="col-span-1 w-full h-[47vh] flex flex-col gap-[1em] rounded-[20px] p-[1.3em] border-[0.7px] border-FFAE02 bg-white" style={{ boxShadow: '0px 0px 10px 0px #00000010' }} key={index}>

                    <div className="w-full h-fit flex items-start justify-between">
                        <span className="font-medium text-[14px] text-black">Trip #1234567XYZ</span>

                        <Expand onClick={() => {
                            handlers.setLocalState({
                                key: 'selectedTrip', value: {

                                }
                            })
                            showModal(<RideTripModal />, false)
                        }} className="w-[18px] h-[18px] text-747474 cursor-pointer" />
                    </div>

                    <span className="inline-flex gap-[0.3em] items-center w-full h-fit">
                        <LuClock3 className="text-27AE65 w-[16px] h-[16px]" />

                        {state.inputs.method === 'order' ?
                            (<span className="inline-flex items-center gap-[0.5em] font-normal text-[12px] text-747474">
                                <span>Departure Date &Time:</span>
                                <span className="">Apr 14 - 15:23</span>
                            </span>)
                            :
                            (<span className="font-normal text-[12px] text-747474">15:23</span>)
                        }
                    </span>

                    <KeyValueBlock
                        keyValueArray={
                            state.inputs.method ?
                                [
                                    { key: 'Driver Name', value: 'Folagbade Roman' },
                                    { key: 'Pickup', value: 'Ojoo Bus Stop' },
                                    { key: 'Endpoint', value: 'Dugbe Bus Stop' },
                                ]
                                :
                                [
                                    { key: 'Trip ID', value: '#1234567XYZ' },
                                    { key: 'Driver Name', value: '-' },
                                    { key: 'Pickup', value: 'Ojoo Bus Stop' },
                                    { key: 'Endpoint', value: 'Dugbe Bus Stop' },
                                    { key: 'Purchased Tickets', value: '1' },
                                ]
                        }
                        containerClassName="gap-[0.75em] pt-[1em] border-t-[0.7px] border-t-d7d7d7"
                        keyClassName="font-normal text-[14px] text-747474"
                        valueClassName="font-normal text-[14px] text-black"
                    />

                    {state.inputs.method === 'order' && (
                        <div className="w-[50%] h-fit py-[0.5em] rounded-full border-[0.7px] border-d7d7d7 bg-white flex items-center justify-center gap-[16px]">
                            <Riders className="w-[18px] h-[15px] text-747474" />

                            <span className="font-medium text-[12px] text-black">3 seats Available</span>
                        </div>
                    )}

                </div>
            ))}

        </div>
    </div>)
}

function RowView() {
    const { state: layoutState, updateState } = useLayoutContext()
    const { showModal } = useModal()
    const { state, handlers } = useTripContext()

    const activeSvgClassName = "w-[20px] h-[20px] text-5D5FEF";
    const inActiveSvgClassName = "w-[20px] h-[20px] text-black";

    return (<div className="w-[97%] h-[calc(100%-74px)] flex flex-col gap-[1em] mx-auto py-[1em] bg-f9f7f8">

        {/* //!By Order */}
        {/* //!Header */}
        <div className="w-full h-[70px] grid grid-cols-[1.2fr_2fr_2fr_2fr_1fr_0.7fr] gap-[10px] items-center bg-FCDDEC border-[0.7px] border-d7d7d7 rounded-[20px] px-[0.5em]">

            {/* //!Ride ID */}
            <div className="col-span-1 w-full h-fit font-bold text-[14px] text-black">Ride ID</div>
            {/* //!Ride ID */}

            {/* //!Driver Name */}
            <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-center">User Name</div>
            {/* //!Driver Name */}

            {/* //!Startoff */}
            <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-center">Pickup</div>
            {/* //!Startoff */}

            {/* //!Endpoint */}
            <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-center">Dropoff</div>
            {/* //!Endpoint */}

            {/* //!Vacant Seats */}
            <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-center">Vacant Seats</div>
            {/* //!Vacant Seats */}

            {/* //!Time */}
            <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-center">Time</div>
            {/* //!Time */}

        </div>
        {/* //!Header */}

        {/* //!Body */}
        <div className="w-full h-[calc(100%-70px)] flex flex-col gap-[0.3em] rounded-[20px] bg-white border-[0.7px] border-d7d7d7 overflow-y-scroll">

        {state.local.allTrips?.map((item: any, index) => (
                <div className="w-full h-[50px] grid grid-cols-[1.2fr_2fr_2fr_2fr_1fr_0.7fr] gap-[10px] items-center py-[0.3em] px-[0.5em]" key={index}>



                    {/* //!Driver Name */}
                    <div className="col-span-1 w-full h-fit font-medium text-[14px] text-black flex items-center gap-[0.5em]">
                        <span>
                            #1234567XYZ
                        </span>

                        <Expand onClick={() => {
                            handlers.setLocalState({
                                key: 'selectedTrip', value: {

                                }
                            })
                            showModal(<RideTripModal />, false)
                        }} className="w-[18px] h-[18px] text-747474 cursor-pointer" />
                    </div>
                    {/* //!Driver Name */}

                    {/* //!Startoff */}
                    <div className="col-span-1 w-full h-fit font-medium text-[14px] text-black text-center">Folagbade Roman</div>
                    {/* //!Startoff */}

                    {/* //!Endpoint */}
                    <div className="col-span-1 w-full h-fit font-medium text-[14px] text-black text-center">Ojoo Bus Stop</div>
                    {/* //!Endpoint */}

                    {/* //!Endpoint */}
                    <div className="col-span-1 w-full h-fit font-medium text-[14px] text-black text-center">Dugbe Bus Stop</div>
                    {/* //!Endpoint */}

                    {/* //!Status */}
                    <div className="col-span-1 w-full h-fit font-medium text-[14px] text-black flex items-center justify-center">
                        <div className="w-fit h-fit py-[0.3em] px-[0.5em] rounded-full border-[0.7px] border-d7d7d7 bg-white flex items-center justify-center gap-[0.75em]">
                            <Riders className="w-[18px] h-[15px] text-747474" />

                            <span className="font-medium text-[12px] text-black">3</span>
                        </div>
                    </div>
                    {/* //!Status */}

                    {/* //!Time */}
                    <div className="col-span-1 w-full h-fit font-medium text-[14px] text-black flex items-center justify-center">
                        <span className="inline-flex gap-[0.3em] items-center w-fit h-fit">
                            <LuClock3 className="text-27AE65 w-[16px] h-[16px]" />
                            <span className="font-normal text-[12px] text-747474">15:23</span></span>
                    </div>
                    {/* //!Time */}

                </div>
            ))}

        </div>
        {/* //!Body */}
    </div>)
}


export { RideGridView, RowView };
