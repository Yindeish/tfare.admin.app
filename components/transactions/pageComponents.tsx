'use client'

import { useTransactionContext } from "@/context.state/transaction";
import { Utils } from "@/utils";

function RowView() {
    const {state} = useTransactionContext();

    return (
        <div className="w-full h-full">

            {/* //!Collections Header */}
            <div className="w-full h-[60px] border-y-[0.7px] border-y-d7d7d7 bg-f9f7f8">
                <div className="w-[90%] h-full mx-auto grid grid-cols-6">
                    {['Transaction Type', 'Order ID', 'Date', 'Time', 'Price', state.inputs.method === 'user' ? 'User Name' : 'Driver Name'].map((item, index) => (
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
                    {state.local.allTransactions?.map((transaction, index) => (
                        <div className="w-full h-[60px] mx-auto grid grid-cols-6 bg-white pb-[1em]" key={index}>

                            <span className="col-span-1 font-medium text-14px] leading-[18px] text-747474 flex items-center justify-center gap-[0.5em] ">
                                <span className="capitalize">{transaction?.eventType}</span>
                            </span>

                            <span className=" flex items-center justify-center">#{transaction?.data?.id}</span>

                            <span className=" flex items-center justify-center capitalize">{Utils.formatDate(transaction?.data?.created_at)}</span>

                            <span className=" flex items-center justify-center capitalize">{Utils.formatTime(transaction?.data?.created_at)}</span>

                            <span className=" flex items-center justify-center">₦ {transaction?.data?.amount}</span>

                            <span className="flex items-center justify-center">{transaction?.data?.customer?.name || transaction?.data?.customer?.email}</span>

                        </div>
                    ))}
                </div>
            </div>
            {/* //!Collections Body */}

        </div>)
}


export { RowView };
