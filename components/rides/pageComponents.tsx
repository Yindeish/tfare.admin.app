'use client'
import { LuClock3 } from "react-icons/lu";
import KeyValueBlock from "@/components/shared/key_value_block";
import { useRideContext } from "@/context.state/ride";
import { useLayoutContext } from "@/context.state/shared/layout";
import { useModal } from "@/context.state/shared/modal";
import { Expand } from "@/public/icons/homeSvgs";
import { useState } from "react";
import RideTripModal from "@/components/rides/modalComponents";
import StatusBadge from "../shared/status_badge";

function RideGridView({ currentFilter }: { currentFilter: 'order' | 'user' }) {
    const { state: layoutState, updateState } = useLayoutContext()
    const { showModal } = useModal()
    const { state, handlers } = useRideContext()

    const arr = Array.from({ length: 20 });

    return (<div className="w-[85%] h-[calc(100%-74px)] mx-auto py-[1em] bg-f9f7f8 overflow-y-scroll">

        <div className="w-full h-fit grid grid-cols-3 gap-[1em]">
            {arr.map((_, index) => (
                <div
                    className="col-span-1 w-full h-[40vh] flex flex-col gap-[1em] rounded-[20px] p-[1.3em] border-[0.7px] border-27AE65 bg-white" style={{ boxShadow: '0px 0px 10px 0px #00000010' }} key={index}>

                    <div className="w-full h-fit flex items-start justify-between">

                        <div className="w-[70%] flex flex-col gap-[12px]">
                            <span className="font-medium text-[14px] text-black">Ride #1234567XYZ</span>

                            <span className="inline-flex gap-[0.3em] items-center w-fit h-fit">
                                <LuClock3 className="text-27AE65 w-[16px] h-[16px]" />
                                <span className="font-normal text-[12px] text-747474">15:23</span></span>
                        </div>

                        <Expand onClick={() => {
                            handlers.setLocalState({
                                key: 'selectedRide', value: {

                                }
                            })
                            showModal(<RideTripModal />, false)
                        }} className="w-[18px] h-[18px] text-747474 cursor-pointer" />
                    </div>

                    <KeyValueBlock
                        keyValueArray={
                            currentFilter === 'order' ?
                                [
                                    { key: 'Driver Name', value: 'Folagbade Roman' },
                                    { key: 'Pickup', value: 'Ojoo Bus Stop' },
                                    { key: 'Endpoint', value: 'Dugbe Bus Stop' },
                                    { key: 'Current Passengers', value: '3' },
                                ]
                                :
                                [
                                    { key: 'Driver Name', value: '-' },
                                    { key: 'Pickup', value: 'Ojoo Bus Stop' },
                                    { key: 'Endpoint', value: 'Dugbe Bus Stop' },
                                    { key: 'Purchased Tickets', value: '-' },
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

function ByOrderRowView() {
    const { state: layoutState, updateState } = useLayoutContext()
    const { showModal } = useModal()
    const { state, handlers } = useRideContext()

    const [currentTab, setCurrentTab] = useState<'ongoing' | 'completed'>('ongoing');
    const [currentFilter, setCurrentFilter] = useState<'order' | 'user'>('order');

    const activeSvgClassName = "w-[20px] h-[20px] text-5D5FEF";
    const inActiveSvgClassName = "w-[20px] h-[20px] text-black";

    const arr = Array.from({ length: 20 });

    return (<div className="w-[97%] h-[calc(100%-74px)] flex flex-col gap-[1em] mx-auto py-[1em] bg-f9f7f8">

        {/* //!By Order */}
        {/* //!Header */}
        <div className="w-full h-[70px] grid grid-cols-[0.7fr_2.5fr_1.7fr_1.5fr_1.5fr_1fr_0.7fr] gap-[10px] items-center bg-FCDDEC border-[0.7px] border-d7d7d7 rounded-[20px] px-[0.5em]">

            {/* //!Leading Space */}
            <div className="col-span-1 w-full h-fit" />
            {/* //!Leading Space */}

            {/* //!RideID */}
            <div className="col-span-1 w-full h-fit font-bold text-[14px] text-747474">RideID</div>
            {/* //!RideID */}

            {/* //!Driver Name */}
            <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-center">Driver Name</div>
            {/* //!Driver Name */}

            {/* //!Startoff */}
            <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-center">Startoff</div>
            {/* //!Startoff */}

            {/* //!Endpoint */}
            <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-center">Endpoint</div>
            {/* //!Endpoint */}

            {/* //!Time */}
            <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-center">Time</div>
            {/* //!Time */}

            {/* //!Trailing Space */}
            <div className="col-span-1 w-full h-fit" />
            {/* //!Trailing Space */}

        </div>
        {/* //!Header */}

        {/* //!Body */}
        <div className="w-full h-[calc(100%-70px)] flex flex-col gap-[0.3em] rounded-[20px] bg-white border-[0.7px] border-d7d7d7 overflow-y-scroll">

            {arr.map((_, index) => (
                <div className="w-full h-[50px] grid grid-cols-[0.7fr_2.5fr_1.7fr_1.5fr_1.5fr_1fr_0.7fr] gap-[10px] items-center py-[0.3em] px-[0.5em]" key={index}>

                    {/* //!Leading Space */}
                    <div className="col-span-1 w-full h-fit" />
                    {/* //!Leading Space */}

                    {/* //!RideID */}
                    <div className="col-span-1 w-full h-fit font-bold text-[14px] text-747474 flex items-center justify-between">
                        <span>#1234567XYZ</span>

                        <Expand onClick={() => {
                            handlers.setLocalState({
                                key: 'selectedRide', value: {

                                }
                            })
                            showModal(<RideTripModal />, false)
                        }} className="w-[18px] h-[18px] text-747474 cursor-pointer" />
                    </div>
                    {/* //!RideID */}

                    {/* //!Driver Name */}
                    <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-center">Folagbade Roman</div>
                    {/* //!Driver Name */}

                    {/* //!Startoff */}
                    <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-center">Ojoo Bus Stop</div>
                    {/* //!Startoff */}

                    {/* //!Endpoint */}
                    <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-center">Dugbe Bus Stop</div>
                    {/* //!Endpoint */}

                    {/* //!Time */}
                    <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 flex items-center justify-center">
                        <span className="inline-flex gap-[0.3em] items-center w-fit h-fit">
                            <LuClock3 className="text-27AE65 w-[16px] h-[16px]" />
                            <span className="font-normal text-[12px] text-747474">15:23</span></span>
                    </div>
                    {/* //!Time */}

                    {/* //!Trailing Space */}
                    <div className="col-span-1 w-full h-fit" />
                    {/* //!Trailing Space */}

                </div>
            ))}

        </div>
        {/* //!Body */}
    </div>)
}

function ByUserRowView() {
    const { state: layoutState, updateState } = useLayoutContext()
    const { showModal } = useModal()
    const { state, handlers } = useRideContext()

    const [currentTab, setCurrentTab] = useState<'ongoing' | 'completed'>('ongoing');
    const [currentFilter, setCurrentFilter] = useState<'order' | 'user'>('order');

    const activeSvgClassName = "w-[20px] h-[20px] text-5D5FEF";
    const inActiveSvgClassName = "w-[20px] h-[20px] text-black";

    const arr = Array.from({ length: 20 });

    return (<div className="w-[97%] h-[calc(100%-74px)] flex flex-col gap-[1em] mx-auto py-[1em] bg-f9f7f8">

        {/* //!By Order */}
        {/* //!Header */}
        <div className="w-full h-[70px] grid grid-cols-[0.7fr_2fr_1.5fr_1.5fr_1fr_0.7fr] gap-[10px] items-center bg-FCDDEC border-[0.7px] border-d7d7d7 rounded-[20px] px-[0.5em]">

            {/* //!Time */}
            <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-end">Time</div>
            {/* //!Time */}

            {/* //!Driver Name */}
            <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-center">User Name</div>
            {/* //!Driver Name */}

            {/* //!Startoff */}
            <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-center">Pickup</div>
            {/* //!Startoff */}

            {/* //!Endpoint */}
            <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-center">Dropoff</div>
            {/* //!Endpoint */}

            {/* //!Status */}
            <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-center">Status</div>
            {/* //!Status */}

            {/* //!Trailing Space */}
            <div className="col-span-1 w-full h-fit" />
            {/* //!Trailing Space */}

        </div>
        {/* //!Header */}

        {/* //!Body */}
        <div className="w-full h-[calc(100%-70px)] flex flex-col gap-[0.3em] rounded-[20px] bg-white border-[0.7px] border-d7d7d7 overflow-y-scroll">

            {arr.map((_, index) => (
                <div className="w-full h-[50px] grid grid-cols-[0.7fr_2fr_1.5fr_1.5fr_1fr_0.7fr] gap-[10px] items-center py-[0.3em] px-[0.5em]" key={index}>

                    {/* //!Time */}
                    <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 flex items-center justify-end">
                        <span className="inline-flex gap-[0.3em] items-center w-fit h-fit">
                            <LuClock3 className="text-27AE65 w-[16px] h-[16px]" />
                            <span className="font-normal text-[12px] text-747474">15:23</span></span>
                    </div>
                    {/* //!Time */}

                    {/* //!Driver Name */}
                    <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-center">Folagbade Roman</div>
                    {/* //!Driver Name */}

                    {/* //!Startoff */}
                    <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-center">Ojoo Bus Stop</div>
                    {/* //!Startoff */}

                    {/* //!Endpoint */}
                    <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-center">Dugbe Bus Stop</div>
                    {/* //!Endpoint */}

                    {/* //!Status */}
                    <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 flex items-center justify-center">
                        <StatusBadge status="Ongoing" className="bg-FFAE0210 text-FFAE02" dotClassName="text-FFAE02" />
                    </div>
                    {/* //!Status */}

                    <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-center">
                        <Expand onClick={() => {
                            handlers.setLocalState({
                                key: 'selectedRide', value: {

                                }
                            })
                            showModal(<RideTripModal />, false)
                        }} className="w-[18px] h-[18px] text-747474 cursor-pointer" />
                    </div>

                </div>
            ))}

        </div>
        {/* //!Body */}
    </div>)
}


export { RideGridView, ByOrderRowView, ByUserRowView };
