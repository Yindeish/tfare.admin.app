'use client'
import { CloseBtn, Deduct, EditBtn, Topup } from "@/public/icons/shared/modalSvgs";
import { useEffect, useState } from "react";
import { redirect, usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useModal } from "@/context.state/shared/modal";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegCirclePause } from "react-icons/fa6";
import { Expand } from "@/public/icons/homeSvgs";
import { LuClock3 } from "react-icons/lu";
import KeyValueBlock from "../shared/key_value_block";

type TTab = 'order' | 'transaction' | ''

function TicketModal() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const { hideModal } = useModal()
    const path = usePathname()

    const tab: TTab = searchParams.get('tab') as TTab;
    const editing: string = searchParams.get('edit') as string;

    const swipeTo = (tab: TTab) => router.push(`${path}?tab=${tab}`);

    const edit = (tab: TTab, edit: string) => router.push(`${path}?tab=${tab}&edit=${edit}`);
    const save = (tab: TTab, edit: string) => router.push(`${path}?tab=${tab}&edit=${edit}`);

    useEffect(() => {
        if (!tab || tab == '' as any) swipeTo('order')
    }, [])


    return (
        <div className="w-full h-full flex flex-col gap-[2em] p-[1em]">

            <div className="flex flex-col gap-[0.75em]">
                <div className="w-full flex items-center justify-between">
                    <span className="font-medium text-[14px] leading-[18px] text-black">Ticket #123457612GSF</span>

                    <Expand onClick={() => {
                    }} className="w-[18px] h-[18px] text-747474 cursor-pointer" />
                </div>

                <span className="inline-flex gap-[0.3em] items-center w-fit h-fit">
                    <LuClock3 className="text-27AE65 w-[16px] h-[16px]" />
                    <span className="font-normal text-[12px] text-747474">15:23</span>
                </span>

                <KeyValueBlock
                    keyValueArray={[
                        { key: 'User Name', value: 'Michelle White' },
                        { key: 'User ID', value: '#16535761HFW' },
                        { key: 'Phone', value: '+234 715 615 8715' },
                        { key: 'Email Address', value: 'Michelle White' },
                        { key: 'Comment', value: 'Lorem ipsum dolor sit ' },
                    ]}
                    containerClassName="w-full pt-[1em] border-t-[0.7px] border-d7d7d7 gap-y-[0.75em]"
                />

                <span className="text-[14px] font-normal leading-[16px]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean placerat viverra bibendum. Integer pharetra pulvinar lacus non rutrum. In purus mauris, ultricies eget laoreet non, facilisis eu ipsum.
                </span>

            </div>

            <div
                className='w-full grid grid-cols-2 gap-[30px]'
            >
                <div className="col-span-1 h-[50px] cursor-pointer bg-27AE65 flex items-center justify-center gap-[10px] rounded-[10px] text-white font-medium text-[14px] leading-[18px]">
                    <FaRegCheckCircle className="w-[20px] h-[20px]" />
                    Resolved
                </div>
                <div className="col-span-1 h-[50px] cursor-pointer bg-FFAE02 flex items-center justify-center gap-[10px] rounded-[10px] text-white font-medium text-[14px] leading-[18px]">
                    <FaRegCirclePause className="w-[20px] h-[20px]" />
                    Pause
                </div>
            </div>

        </div>
    )
}

export default TicketModal;

