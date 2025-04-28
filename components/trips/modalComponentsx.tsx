'use client'
import shared_images from "@/constants/images/shared";
import { useRiderContext } from "@/context.state/rider";
import { CloseBtn, Deduct, EditBtn, Topup } from "@/public/icons/shared/modalSvgs";
import StatusBadge from "../shared/status_badge";
import InputField from "../shared/inputFieldTile";
import { useEffect, useState } from "react";
import { redirect, usePathname, useRouter, useSearchParams } from "next/navigation";
import { Bus } from "@/public/icons/homeSvgs";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useModal } from "@/context.state/shared/modal";

type TTab = 'order' | 'transaction' | ''

function RideTripModal() {
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
        <div className="w-full h-full">

            {/* //!Edit Close Btns */}
            <div className="flex justify-end items-center gap-[1em]">
                {editing == 'true' || !editing || editing === '' ?
                    (<IoMdCheckmarkCircle onClick={() => edit(tab, 'false')} className="w-[24px] h-[24px] text-27AE65 cursor-pointer" />)
                    :
                    (<EditBtn onClick={() => edit(tab, 'true')} className="w-[24px] h-[24px] text-747474 cursor-pointer" />)
                }
                <CloseBtn onClick={hideModal} className="w-[24px] h-[24px] text-CF0707" />
            </div>
            {/* //!Edit Close Btns */}

        </div>
    )
}

export default RideTripModal;

