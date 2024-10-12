'use client'
import shared_images from "@/constants/images/shared";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { CloseBtn, Deduct, EditBtn, Topup } from "@/public/icons/shared/modalSvgs";
import StatusBadge from "../shared/status_badge";
import InputField from "../shared/inputFieldTile";
import { useEffect, useState } from "react";
import { SortCTA } from "../shared/sub_header_components";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { Bus } from "@/public/icons/homeSvgs";
import { FaRegCheckCircle, FaStar } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import { BsChevronDown } from "react-icons/bs";
import { FaRegCirclePause } from "react-icons/fa6";
import driverImages from "@/constants/images/drivers";
import { Pdf } from "@/public/icons/driverSvgs";
import { useModal } from "@/context.state/shared/modal";

type TTab = 'order' | 'transaction' | ''
type TView = 'vehicle-info' | 'orders-transactions' | ''

export const ToggleBtn = ({ on, onClick, className = '' }: { on: boolean, onClick: () => void, className?: string }) => (
    <div onClick={onClick} className={`${on ? 'bg-27AE65' : 'bg-747474'} w-[35px] h-[20px] rounded-full flex items-center overflow-visible absolute top-[0.75em] right-[0.5em] z-[3] ${className}`}>
        <div className={`bg-white w-[25px] h-[25px] ${on ? 'translate-x-[15px]' : 'translate-x-[-5px]'} rounded-full`}></div>
    </div>
);


function DriverModal() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const { hideModal } = useModal()

    const view: TView = searchParams.get('view') as TView;
    const tab: TTab = searchParams.get('tab') as TTab;
    const editing: string = searchParams.get('edit') as string;

    const swipeViewTo = (view: TView) => router.push(`/drivers?view=${view}`);
    const swipeTabTo = (view: TView, tab: TTab) => router.push(`/drivers?view=${view}&tab=${tab}`);
    const edit = (view: TView, tab: TTab, edit: string) => router.push(`/drivers?view=${view}&tab=${tab}&edit=${edit}`);
    const save = (view: TView, tab: TTab, edit: string) => router.push(`/drivers?view=${view}&tab=${tab}&edit=${edit}`);

    useEffect(() => {
        if (!view || view == '' as any) swipeViewTo('vehicle-info')
    }, [])


    return (
        <div className="w-full h-full cursor-default">
            {/* //!Edit Close Btns */}
            <div className="flex justify-end items-center gap-[1em]">
                {editing == 'true' || !editing || editing === '' ?
                    (<IoMdCheckmarkCircle onClick={() => edit(view, tab, 'false')} className="w-[24px] h-[24px] text-27AE65 cursor-pointer" />)
                    :
                    (<EditBtn onClick={() => edit(view, tab, 'true')} className="w-[24px] h-[24px] text-747474 cursor-pointer" />)
                }
                <CloseBtn onClick={hideModal} className="w-[24px] h-[24px] text-CF0707 cursor-pointer" />
            </div>
            {/* //!Edit Close Btns */}

            <div className="w-full h-[100%] pb-[2em] overflow-y-scroll">
                <DriverBlock />

                {view === 'vehicle-info' ? <VehicleInfo /> : <OrdersTransactionsTable />}
            </div>
        </div>
    )
}

export default DriverModal;

function DriverBlock() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const view: TView = searchParams.get('view') as TView;

    const swipeViewTo = (view: TView) => router.push(`/drivers?view=${view}`);

    return (
        <div className="w-[75%] h-[55vh] mx-auto grid grid-cols-[1fr_3fr_3fr] gap-[1em] border-b-[1px] border-b-d7d7d7 pb-[5vh]">
            <div className="col-span-1 h-full border-[1px] border-d7d7d7 rounded-[20px] flex flex-col gap-[7px] justify-center items-center">
                <img className="w-[100px] h-[100px] rounded-full" src={shared_images.user_profile_image.src} alt="" />

                <div className="flex gap-[8px]">
                    {Array.from({ length: 4 }).map((_, index) => <FaStar className="w-[20px] h-[19px] text-FFAE02" key={index} />)}
                </div>

                <span className="font-bold text-[16px] leading-[16px] text-747474">4.9 (390)</span>

                <span className="font-normal text-[12px] leading-[14px] text-747474">#153710YUW</span>

                <StatusBadge enabled status="active" className="text-[12px] gap-[2em]" dotClassName="w-[10px] h-[10px]" />

                <StatusBadge enabled={false} status="in-active" className="text-[12px]" dotClassName="w-[10px] h-[10px]" />

                {view === 'vehicle-info' && <span onClick={() => swipeViewTo('orders-transactions')} className="w-[90%] h-[40px] flex items-center justify-center gap-[16px] rounded-[15px] bg-FCDDEC border-[0.7px] border-d7d7d7 p-[0.3em] cursor-pointer">
                    <span className="font-medium text-[12px] leading-[12px] text-black">View History</span>

                    <BsChevronDown className="w-[20px] h-[15px] text-747474" />
                </span>}

                {view === 'orders-transactions' && <span onClick={() => swipeViewTo('vehicle-info')} className="w-[90%] h-[40px] flex items-center justify-center gap-[16px] rounded-[15px] bg-FCDDEC border-[0.7px] border-d7d7d7 p-[0.3em] cursor-pointer">
                    <span className="font-medium text-[12px] leading-[12px] text-black">Vehicle Info</span>

                    <BsChevronDown className="w-[20px] h-[15px] text-747474" />
                </span>}
            </div>

            <div className="col-start-2 col-span-1 h-full flex flex-col justify-between">
                <InputField
                    name="username"
                    label="Username"
                    value=""
                    onChange={() => { }}
                    onBlur={() => { }}
                />
                <InputField
                    name="email"
                    label="Email Address"
                    value=""
                    onChange={() => { }}
                    onBlur={() => { }}
                />
                <InputField
                    name="bankName"
                    label="Bank Name"
                    value=""
                    onChange={() => { }}
                    onBlur={() => { }}
                />
                <InputField
                    name="earnings"
                    label="Earnings"
                    value=""
                    onChange={() => { }}
                    onBlur={() => { }}
                />
            </div>

            {/* //!Payout Status, Phone Number, Acount Number */}
            <div className="col-start-3 col-span-1 h-full flex flex-col justify-between">
                <InputField
                    name="phoneNumber"
                    label="Phone Number"
                    value=""
                    onChange={() => { }}
                    onBlur={() => { }}
                />
                <InputField
                    name="accountNumber"
                    label="Account Number"
                    value=""
                    onChange={() => { }}
                    onBlur={() => { }}
                />

                {/* //!Payout Status */}
                <div className={`flex flex-col gap-[12px]`}>
                    <span className={`font-normal text-[14px] leading-[17px] text-747474`}>Payout Status</span>

                    <div
                        className='w-full grid grid-cols-2 gap-[30px]'
                    >
                        <div className="col-span-1 h-[50px] cursor-pointer bg-27AE65 flex items-center justify-center gap-[10px] rounded-[10px] text-white font-medium text-[14px] leading-[18px]">
                            <FaRegCheckCircle className="w-[20px] h-[20px]" />
                            Payout
                        </div>
                        <div className="col-span-1 h-[50px] cursor-pointer bg-CF0707 flex items-center justify-center gap-[10px] rounded-[10px] text-white font-medium text-[14px] leading-[18px]">
                            <FaRegCirclePause className="w-[20px] h-[20px]" />
                            Pause
                        </div>
                    </div>
                </div>
                {/* //!Payout Status */}
            </div>
            {/* //!Payout Status, Phone Number, Acount Number */}
        </div>
    )
}

function VehicleInfo() {
    const [credentials, setCredentials] = useState({
        0: false,
        1: false,
        2: false,
        3: false,
    });


    return (
        <div className="w-[75%] h-fit flex flex-col gap-[3em] mx-auto mt-[5vh]">
            <span className="font-medium text-[25px] leading-[25px] text-black">Vehicle Information</span>

            <div className="w-[85%] grid grid-cols-[1fr_2fr_1fr] gap-[3em]">
                {/* //!Submitted Credentials */}
                <div className="col-start-1 col-span-1 h-fit flex flex-col gap-[1em]">
                    <span className="font-normal text-[14px] leading-[17px] text-747474">Submitted Credentials</span>

                    <div className="w-full h-full border-[0.7px] border-d7d7d7 rounded-[20px] grid grid-cols-1 grid-rows-[auto_auto_auto_auto] gap-y-[1em] p-[2vh]">

                        {Array.from({ length: 4 }).map((_, index) => (
                            <div className="col-span-1 row-span-1 h-[100px] rounded-[10px] flex flex-col relative overflow-hidden" style={{ boxShadow: '0px 0px 12.7px #00000015' }} key={index}>
                                {/* //!Toggle Overlay */}
                                <ToggleBtn on={credentials[1]} onClick={() => setCredentials((prev) => ({ ...prev, [index]: true }))} />
                                {/* //!Toggle Overlay */}

                                <div className="w-full h-[75%]">
                                    <img className="w-full h-full" src={driverImages.document_preview.src} alt="" />
                                </div>

                                <div className="h-[25%] flex items-center justify-center gap-[10px] bg-white   ">
                                    <Pdf className="w-[16px] h-[16px]" />
                                    <span className="font-medium text-[12px] leading-[14px]">Vehicle In...</span>
                                </div>

                            </div>
                        ))}

                    </div>
                </div>
                {/* //!Submitted Credentials */}

                {/* //!Vehicle Type */}
                <div className="col-start-2 col-span-1 h-full flex flex-col justify-between">

                    <InputField
                        name="vehicleType"
                        label="Vehicle Type"
                        value=""
                        onChange={() => { }}
                        onBlur={() => { }}
                    />
                    <InputField
                        name="vehicleModel"
                        label="Vehicle Model"
                        value=""
                        onChange={() => { }}
                        onBlur={() => { }}
                    />
                    <InputField
                        name="vehicleYear"
                        label="Vehicle Year"
                        value=""
                        onChange={() => { }}
                        onBlur={() => { }}
                    />
                    <InputField
                        name="vehicleColour"
                        label="Vehicle Colour"
                        value=""
                        onChange={() => { }}
                        onBlur={() => { }}
                    />
                    <InputField
                        name="License Plate"
                        label="License Plate"
                        value="MUS - 123 - AE"
                        onChange={() => { }}
                        onBlur={() => { }}
                    />
                </div>
                {/* //!Vehicle Type */}

                {/* //!Uploaded Images */}
                <div className="col-start-3 col-span-1 h-fit flex flex-col gap-[1em]">
                    <span className="font-normal text-[14px] leading-[17px] text-747474">Uploaded Images</span>

                    <div className="w-full h-full grid grid-cols-1 grid-rows-[150px_150px_150px] gap-y-[10px]">
                        {[
                            driverImages.vehicle_back_view.src,
                            driverImages.vehicle_front_view.src,
                            driverImages.vehicle_side_view.src
                        ].map((img, index) => (
                            <img className="col-span-1 row-span-1 w-full h-full" src={img} key={index} />
                        ))}
                    </div>
                </div>
                {/* //!Uploaded Images */}
            </div>
        </div>
    )
}

function OrdersTransactionsTable() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const view: TView = searchParams.get('view') as TView;
    const tab: TTab = searchParams.get('tab') as TTab;

    const swipeTabTo = (view: TView, tab: TTab) => router.push(`/drivers?view=${view}&tab=${tab}`);
    // const swipeTo = (view: TView, extra?: { key: string, value: string }) => router.push(`/wallet/deposit/fiat?view=${view}${extra ? `&${extra.key}=${extra.value}` : ''}`);

    useEffect(() => {
        if (view === 'orders-transactions') {
            if (!tab || tab == '' as any) swipeTabTo(view, 'order')
        }
    }, [])

    return (
        <>
            {/* //!Orders, Transactions */}
            <div className="w-[85%] h-[50px] mx-auto flex justify-between items-center">
                {/* //!Order-Transaction Tab Controllsers */}
                <div className="w-fit h-full flex gap-[36px]">

                    {[{ name: 'order', label: 'All Orders' }, { name: 'transaction', label: 'All Transaction' }].map(({ label, name }, index) => (
                        <div
                            onClick={() => swipeTabTo(view, name as TTab)}
                            className={`w-fit h-full border-b-[4px] flex items-center justify-center ${tab == name ? 'border-b-5D5FEF text-5D5FEF' : 'border-b-transparent text-747474 cursor-pointer'}`} key={index}>{label}</div>
                    ))}
                </div>
                {/* //!Order-Transaction Tab Controllsers */}

                <div className="w-fit h-full flex items-center gap-[20px]">
                    <SortCTA
                        className="h-[35px]"
                        onClick={() => { }}
                    />

                    <CloseBtn className="w-[24px] h-[24px] text-CF0707" />
                </div>

            </div>
            {/* //!Orders, Transactions */}

            {/* //!Collections Header */}
            <div className="w-full h-[60px] border-y-[0.7px] border-y-d7d7d7 bg-f9f7f8">
                <div className="w-[90%] h-full mx-auto grid grid-cols-6">
                    {['Order Type', 'Order ID', 'Date', 'Driver', 'Price', 'Status'].map((item, index) => (
                        <span className="col-span-1 font-medium text-14px] leading-[18px] text-747474 text-center flex items-center justify-center " key={index}>{item}</span>
                    ))}
                </div>
            </div>
            {/* //!Collections Header */}
            {/* //!Collections Body */}
            <div className="w-full h-[37%]">
                {/* //!(90%+5px) +5px here is coming from the scroll bar  */}
                <div className="w-[calc(90%+5px)] h-full mx-auto overflow-y-scroll">
                    {/* //!(90%+5px) +5px here is coming from the scroll bar  */}
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div className="w-full h-[60px] mx-auto grid grid-cols-6 bg-white " key={index}>

                            <span className="col-span-1 font-medium text-14px] leading-[18px] text-747474 flex items-center justify-center gap-[0.5em] ">
                                <Bus className="w-[20px] h-[20px]" />
                                <span>Trip</span>
                            </span>

                            <span className=" flex items-center justify-center">#7654321XYZ</span>

                            <span className=" flex items-center justify-center">April 14, 2024</span>

                            <span className=" flex items-center justify-center">Tom Hawkins</span>

                            <span className=" flex items-center justify-center">₦ 500.00</span>

                            <span className="flex items-center justify-center"><StatusBadge status="Ongoing" className="bg-FFAE0210 text-FFAE02" dotClassName="text-FFAE02" /></span>

                        </div>
                    ))}
                </div>
            </div>
            {/* //!Collections Body */}
        </>
    )
}

